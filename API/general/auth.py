import jwt
import json

from django.http import JsonResponse
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.conf import settings
from django.shortcuts import redirect, reverse
from django.core.mail import send_mail

from .models import Feedback

@csrf_exempt
def register(request):
    """
    body format: { "name": "John Doe", "email": "some@email.com" } 
    """
    data = json.loads(request.body.decode("ascii"))
    user = User.objects.filter(email=data['email']).first()
    jwt_code = jwt.encode({ 'email' : data['email'] }, settings.SECRET_KEY, algorithm='HS256').decode('ascii')

    # print (data['url'])
    if user and user.is_active:
        res = {
            "status": "authenticated",
            "jwt": jwt_code
        }
    elif user and not user.is_active:
        res = {
            "status": "unverified",
            "msg": "Please verify your email."
        }
    else:
        names = data['name'].split(' ')
        user = User.objects.create_user(username=data['email'], email=data['email'])
        user.first_name = names[0]
        user.last_name = names[1]
        user.is_active = False
        user.save()

        url = f"{settings.BACKEND_URL}{reverse('verify_email', kwargs={ 'jwt_code': jwt_code })}"
        email_body = f"Hi {data['name']}, \n\nPlease go ahead and verify your email here: \n{url}\n\nThank you."
        send_mail('Welcome to ADAPT', email_body, settings.POSTMARK_SENDER, [data['email']], fail_silently=True)

        res = {
            "status": "email-sent",
            "msg": "Verification email sent. Please check your email."
        }

    return JsonResponse(res, safe=True)


@csrf_exempt
def verify_email(request, jwt_code):
    try:
        email = jwt.decode(jwt_code, settings.SECRET_KEY, algorithms=['HS256'])['email']
        user = User.objects.filter(email=email).first()
        if user:
            user.is_active = True
            user.save()
            url = f'{settings.FRONTEND_URL}/about?jwt={jwt_code}'
        else:
            url = f'{settings.FRONTEND_URL}/account?msg=Invalid token'
    except Exception as e:
        url = f'{settings.FRONTEND_URL}/account?msg=Invalid token'

    return redirect(url)


def get_user(request):
    try:
        email = jwt.decode(request.META.get('HTTP_AUTHORIZATION'), settings.SECRET_KEY, algorithms=['HS256'])['email']
        user = User.objects.filter(email=email)[0]
        return user if user.is_active else None
    except Exception as e:
        pass


@csrf_exempt
def leave_feedback(request):
    """
    body format: { "content": "feedback content ..." } 
    """
    user = get_user(request)
    if not user:
        return HttpResponse('Unauthorized', status=401)

    data = json.loads(request.body.decode("ascii"))
    Feedback.objects.create(user=user, content=data['content'])

    return HttpResponse("success")
