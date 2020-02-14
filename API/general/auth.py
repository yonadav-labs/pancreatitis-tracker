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
    email = data['email'].lower()
    password = data['password']
    user = User.objects.filter(email=email).first()
    jwt_code = jwt.encode({ 'email' : email }, settings.SECRET_KEY, algorithm='HS256').decode('ascii')

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
        user = User.objects.create_user(username=email, email=email)
        user.first_name = names[0]
        user.last_name = names[1]
        user.is_active = False
        user.set_password(password)
        user.save()

        url = f"{settings.BACKEND_URL}{reverse('verify_email', kwargs={ 'jwt_code': jwt_code })}"
        email_body = f"Hi {data['name']}, \n\nPlease go ahead and verify your email here: \n{url}\n\nThank you."
        send_mail('Welcome to ADAPT', email_body, settings.POSTMARK_SENDER, [email], fail_silently=True)

        res = {
            "status": "email-sent",
            "msg": "Verification email sent. Please check your email."
        }

    return JsonResponse(res, safe=True)


@csrf_exempt
def sign_in(request):
    """
    body format: { email": "some@email.com", "password": "Test1234" } 
    """
    data = json.loads(request.body.decode("ascii"))
    email = data['email'].lower()
    password = data['password']
    user = User.objects.filter(email=email).first()
    jwt_code = jwt.encode({ 'email' : email }, settings.SECRET_KEY, algorithm='HS256').decode('ascii')

    # print (data['url'])
    if user and user.is_active:
        success = user.check_password(password)
        if success:
            res = {
                "status": "authenticated",
                "jwt": jwt_code
            }
        else:
            res = {
                "status": "password_incorrect",
                "msg": "Your password is incorrect."
            }

    elif user and not user.is_active:
        res = {
            "status": "unverified",
            "msg": "Please verify your email."
        }
    else:
        res = {
            "status": "unregistered",
            "msg": "Please register your account."
        }

    return JsonResponse(res, safe=True)


@csrf_exempt
def reset_password(request):
    """
    body format: { "name": "John Doe", "email": "some@email.com" } 
    """
    data = json.loads(request.body.decode("ascii"))
    email = data['email'].lower()
    password = data['password']
    user = User.objects.filter(email=email).first()

    # print (data['url'])
    if user and user.is_active:
        user.is_active = False
        user.set_password(password)
        user.save()

        jwt_code = jwt.encode({ 'email' : email }, settings.SECRET_KEY, algorithm='HS256').decode('ascii')
        url = f"{settings.BACKEND_URL}{reverse('verify_email', kwargs={ 'jwt_code': jwt_code })}"
        email_body = f"Hi {data['name']}, \n\nYour password reset successfully. Please confirm it with the following link. \n{url}\n\nThank you."
        send_mail('Welcome to ADAPT', email_body, settings.POSTMARK_SENDER, [email], fail_silently=True)

        res = {
            "status": "email-sent",
            "msg": "Verification email sent. Please check your email."
        }
    elif user and not user.is_active:
        res = {
            "status": "unverified",
            "msg": "Please verify your email."
        }
    else:
        res = {
            "status": "unregistered",
            "msg": "Please register your account."
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
    feedback = Feedback.objects.create(user=user, content=data['content'])

    admin_email = 'jason.5001001@gmail.com'
    url = f"{settings.BACKEND_URL}/admin/general/feedback/{feedback.id}/change/"
    email_body = f"{user.first_name} {user.last_name} ({user.email}) left a feedback.\n\n{url}"
    send_mail('ADAPT Feedback', email_body, settings.POSTMARK_SENDER, [admin_email, settings.FEEDBACK_EMAIL], fail_silently=True)

    return HttpResponse("success")
