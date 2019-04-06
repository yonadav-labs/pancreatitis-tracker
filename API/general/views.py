import json
import datetime

from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from algorithms import *
from .models import *

ALGORITHMS = [
    map.AlgorithmMap, 
    marshall.AlgorithmMarshall, 
    early_warning.AlgorithmEarlyWarning, 
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

@csrf_exempt
def get_algorithms(request):
    results = []
    req = {}
    if request.method == 'POST':
        req = json.loads(request.body.decode("utf-8"))

    for algorithm in ALGORITHMS:
        algo = algorithm(req)
        result = {
            "algorithm": algo.__class__.__name__,
            "params": algo.params(),
        }

        if request.method == 'GET':
            result["description"] = algo.__doc__
            results.append(result)
        elif algo.can_process():
            results.append(result)

    return JsonResponse(results, safe=False)


def _run_algorithm(algorithm, data):
    algo = algorithm(data)
    result = {
        "algorithm": algo.__class__.__name__,
        "is_capable": algo.can_process(),
        "params": algo.params(),
    }

    if algo.can_process():
        result['score'] = algo.evaluate()
    else:
        result['msg'] = 'Please check required fields.'

    return result


@csrf_exempt
def run_algorithms(request):
    data = json.loads(request.body.decode("utf-8"))
    results = []
    output = {}
    for algorithm in ALGORITHMS:
        result = _run_algorithm(algorithm, data)
        results.append(result)

        if result['is_capable']:
            output[result['algorithm']] = result['score']

    # track running
    user = request.user if request.user.is_authenticated else None
    RunAlgorithm.objects.create(user=user, 
                                input=json.dumps(data, indent=2),
                                output=json.dumps(output, indent=2),
                                run_at=datetime.datetime.now())

    return JsonResponse(results, safe=False)


@csrf_exempt
def run_algorithm(request, algorithm):
    algo = ''
    for ii in ALGORITHMS:
        if algorithm.lower() == ii.__name__.lower():
            algo = ii
            break

    if not algo:
        return JsonResponse({"msg": "No matching algorithm"}, safe=False)

    data = json.loads(request.body.decode("utf-8"))

    return JsonResponse(_run_algorithm(algo, data), safe=False)
