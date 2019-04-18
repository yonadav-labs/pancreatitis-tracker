import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from general.utils import *

@csrf_exempt
def register(request):
    data = json.loads(request.body)
    resp = send_email([data['email']], 'Welcome to APSC', 'Nice to meet you.\nPlease go ahead and verify your email here: http://localhost:3000/verify/jwt-token')
    print (resp)
    res = {
        "success": True
    }

    return JsonResponse(res, safe=True)
