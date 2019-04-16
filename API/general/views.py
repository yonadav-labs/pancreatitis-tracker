import json
import datetime

from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from algorithms import *
from .models import *

ALGORITHMS = [
    # map.AlgorithmMap, 
    # marshall.AlgorithmMarshall, 
    # early_warning.AlgorithmEarlyWarning, 
    apache.AlgorithmApache,
    bisap.AlgorithmBisap, 
    glasgow.AlgorithmGlasgow, 
    haps.AlgorithmHaps, 
    jss.AlgorithmJss, 
    panc3.AlgorithmPanc3, 
    pop.AlgorithmPop, 
    ranson.AlgorithmRanson, 
    sirs.AlgorithmSirs
]

def get_preprocessed_data(request):
    data = json.loads(request.body.decode("utf-8"))
    is_approx_paO2 = data.get('spO2') and not data.get('paO2')

    data['glasgow_coma'] = interface.AlgorithmInterface(data).glasgow_coma_scale()
    data['paO2'] = interface.AlgorithmInterface(data).arterialbg_from_pulseox()
    data['bmi'] = interface.AlgorithmInterface(data).calculate_bmi()
    data['bicarbonate'] = interface.AlgorithmInterface(data).get_bicarbonate()
    data['peritonitis'] = interface.AlgorithmInterface(data).get_peritonitis()
    
    data['arterial_pressure'] = map.AlgorithmMap(data).evaluate()
    data['sirs_score'] = sirs.AlgorithmSirs(data).evaluate()
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
            "algorithm": algo.__class__.__name__,
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
        "algorithm": algo.__class__.__name__,
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
    res = { 
        'results': [],
        'is_approx_paO2': is_approx_paO2
    }
    output = {}

    for algorithm in ALGORITHMS:
        result = _run_algorithm(algorithm, data)
        res['results'].append(result)

        if result['is_capable']:
            output[result['algorithm']] = result['score']

    # track running
    user = request.user if request.user.is_authenticated else None
    RunAlgorithm.objects.create(user=user, 
                                input=json.dumps(data, indent=2),
                                output=json.dumps(output, indent=2),
                                run_at=datetime.datetime.now())

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
