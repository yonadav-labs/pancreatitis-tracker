import jwt
import json

from django.http import JsonResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.conf import settings

from general.utils import *

@csrf_exempt
def register(request):
    """
    body format: { "name": "John Doe", "email": "some@email.com" } 
    """
    data = json.loads(request.body)
    user = User.objects.filter(email=data['email']).first()
    jwt_code = jwt.encode({ 'email' : data['email'] }, settings.SECRET_KEY, algorithm='HS256')

    if user and user.is_active:
        res = {
            "status": "authenticated",
            "jwt": jwt_code
        }
    elif user and not user.is_active:
        res = {
            "status": "unverified",
            "msg": "Please verify your email"
        }
    else:
        names = data['name'].split(' ')
        user = User.objects.create_user(username=data['email'],
                                        email=data['email'])
        user.first_name = names[0]
        user.last_name = names[1]
        user.is_active = False
        user.save()

        email_body = 'Please go ahead and verify your email here: {}/verify/{}'.format(settings.FRONTEND_URL, jwt_code)
        send_email([data['email']], 'Welcome to APSC', email_body)
        res = {
            "status": "email-sent"
        }

    return JsonResponse(res, safe=True)


def verify_email(request, jwt_code):
    try:
        email = jwt.decode(jwt_code, settings.SECRET_KEY, algorithms=['HS256'])['email']
        user = User.objects.filter(email=email).first()
        if user:
            user.is_active = True
            user.save()
            res = { "state": True }
        else:
            res = { "state": False }
    except Exception as e:
        res = { "state": False }

    return JsonResponse(res, safe=True)
