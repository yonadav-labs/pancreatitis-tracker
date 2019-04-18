import requests

from django.conf import settings

def send_email(to, subject, body):
    return requests.post(
        settings.MAILGUN_DOMAIN + "/messages",
        auth=("api", settings.MAILGUN_API_KEY),
        data={ "from": settings.FROM_EMAIL,
               "to": to,
               "subject": subject,
               "text": body})
