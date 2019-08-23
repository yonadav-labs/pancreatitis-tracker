import jwt
import json

from math import exp
from datetime import datetime, timedelta

from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.conf import settings

from algorithms import *
from .models import *
from .auth import get_user


ALGORITHMS = [
    # map.AlgorithmMap, 
    # early_warning.AlgorithmEarlyWarning, 
    apache.AlgorithmApache,
    bisap.AlgorithmBisap, 
    glasgow.AlgorithmGlasgow, 
    haps.AlgorithmHaps, 
    jss.AlgorithmJss, 
    marshall.AlgorithmMarshall, 
    panc3.AlgorithmPanc3, 
    pop.AlgorithmPop, 
    ranson.AlgorithmRanson, 
    sirs.AlgorithmSirs
]


def get_preprocessed_data(request, convert_unit=True):
    data = json.loads(request.body.decode("utf-8"))
    is_approx_paO2 = data.get('spO2') and not data.get('paO2')

    data['glasgow_coma'] = interface.AlgorithmInterface(data).glasgow_coma_scale()
    data['paO2'] = interface.AlgorithmInterface(data).arterialbg_from_pulseox()
    data['bmi'] = interface.AlgorithmInterface(data).calculate_bmi()
    data['bicarbonate'] = interface.AlgorithmInterface(data).get_bicarbonate()
    data['peritonitis'] = interface.AlgorithmInterface(data).get_peritonitis()
    data['maintenance_fluid'] = interface.AlgorithmInterface(data).maintenance_fluid()
    data['arterial_pressure'] = map.AlgorithmMap(data).evaluate()
    data['sirs_score'] = sirs.AlgorithmSirs(data).evaluate()

    if convert_unit: # convert unit
        if data.get('fiO2'):
            data['fiO2'] /= 100.0   # convert to 0-1
        if data.get('calcium'):
            data['calcium'] /= 4.0078

    return data, is_approx_paO2


@csrf_exempt
def get_algorithms(request):
    res = { 'results': [] }
    data = {}

    if request.method == 'POST':
        data, is_approx_paO2 = get_preprocessed_data(request)
        res['is_approx_paO2'] = is_approx_paO2

    for algorithm in ALGORITHMS:
        algo = algorithm(data)
        result = {
            "algorithm": algo.name,
            "params": algo.params(),
            "score_range": algo.score_range
        }

        if request.method == 'GET':
            result["description"] = algo.__doc__
            res['results'].append(result)
        elif algo.can_process():
            res['results'].append(result)

    return JsonResponse(res, safe=False)


def _run_algorithm(algorithm, data):
    algo = algorithm(data)
    result = {
        "algorithm": algo.name,
        "is_capable": algo.can_process(),
        "params": algo.params(),
        "score_range": algo.score_range        
    }

    if algo.can_process():
        result['score'] = algo.evaluate()
    else:
        result['msg'] = 'Please check required and either/or fields.'

    return result


@csrf_exempt
def run_algorithms(request):
    data, is_approx_paO2 = get_preprocessed_data(request)
    user = get_user(request)

    if not user:
        return HttpResponse('Unauthorized', status=401)

    res = { 
        'results': [],
        'is_approx_paO2': is_approx_paO2
    }
    output = {}
    mounzer_input = {
        'time': data.get('time')
    }

    pop_percent = None
        
    for algorithm in ALGORITHMS:
        result = _run_algorithm(algorithm, data)
        res['results'].append(result)

        if result['algorithm'] == 'POP' and result['is_capable']:
            R = -4.908 + 0.248 * result['score']
            prob = exp(R) / (1 + exp(R))
            pop_percent = 100 * prob

        if result['is_capable']:
            output[result['algorithm']] = result['score']
            _key = result['algorithm'].replace('II', '').replace(' ', '').lower() + '_score'
            mounzer_input[_key] = result['score']

    # calculate mounzer rules
    mounzer_output = []
    for ii in range(1, 13):
        mounzer_class = getattr(mounzer_rules, f'Rule{ii}')
        rule = mounzer_class(mounzer_input)
        result = {
            "rule": rule.name,
            "is_capable": rule.can_process(),
            "params": rule.params()
        }

        if rule.can_process():
            result['score'] = rule.evaluate()

        mounzer_output.append(result)

    res['mounzer_results'] = mounzer_output

    res['considerations'] = {
        'maintenance_fluid': f"Baseline fluid needs are {data['maintenance_fluid']} mL/day." 
            if data['maintenance_fluid'] 
            else "Please enter information about patient's body composition (height, weight, sex) \
            to receive baseline fluid recommendations.",
        'pop_percent': f'The predicted probability of mortality by the POP score is {pop_percent:.2f}%.' 
            if pop_percent else ''
    }

    # track running
    RunAlgorithm.objects.create(user=user, 
                                input=json.dumps(get_preprocessed_data(request, False)[0], indent=2),
                                output=json.dumps(output, indent=2),
                                run_at=datetime.strptime(data['time_stamp'], '%Y-%m-%dT%H:%M:%S.%fZ'))

    return JsonResponse(res, safe=False)


@csrf_exempt
def run_algorithm(request, algorithm):
    algo = ''
    for ii in ALGORITHMS:
        if algorithm.lower() == ii.__name__.lower():
            algo = ii
            break

    if not algo:
        return JsonResponse({"msg": "No matching algorithm"}, safe=False)

    data, is_approx_paO2 = get_preprocessed_data(request)

    return JsonResponse(_run_algorithm(algo, data), safe=False)


@csrf_exempt
def load_input_history(request):
    user = get_user(request)
    if not user:
        return HttpResponse('Unauthorized', status=401)

    res = []
    for ii in RunAlgorithm.objects.filter(user=user).order_by('-run_at')[:10]:
        data = json.loads(ii.input)
        data['weight'] = interface.AlgorithmInterface({}).kg_to_lb(data['weight'])
        data['height'] =interface.AlgorithmInterface({}).cm_to_inch(data['height'])

        res.append({ 
            'run_at': datetime.strftime(ii.run_at, '%m/%d/%Y %H:%M'), 
            'input_data': data
        })

    return JsonResponse(res, safe=False)


def get_graph_data(request):
    user = get_user(request)
    if not user:
        return HttpResponse('Unauthorized', status=401)

    qs = RunAlgorithm.objects.filter(user=user).order_by('-run_at')
    xrange = int(request.GET.get('range', '0'))
    if xrange:
        delta = datetime.now() - timedelta(hours=xrange)
        qs = qs.filter(run_at__gte=delta).order_by('-run_at')

    res = {
        'sirs': [],
        'marshall': [],
        'bun': [],
        'creatinine': [],
        'labels': []
    }

    now = datetime.now()
    for ii in qs:
        output = json.loads(ii.output)
        input = json.loads(ii.input)
        if not 'time_stamp' in input:
            continue
        admission_date = datetime.strptime(input['time_stamp'], '%Y-%m-%dT%H:%M:%S.%fZ')
        diff = (now - admission_date).total_seconds() / 3600.0

        res['sirs'].insert(0, output.get('SIRS'))
        res['marshall'].insert(0, output.get('Marshall'))
        res['bun'].insert(0, input['bun'])
        res['creatinine'].insert(0, input['creatinine'])
        res['labels'].insert(0, '{:.1f} hrs'.format(diff))

    return JsonResponse(res, safe=False)
