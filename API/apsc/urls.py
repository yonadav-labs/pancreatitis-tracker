"""apsc URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from general import views
from general import auth
admin.site.site_header = "ADAPT administration"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('run_algorithms', views.run_algorithms),
    path('run_algorithm/<str:algorithm>', views.run_algorithm),
    path('algorithms', views.get_algorithms),
    path('load_input_history', views.load_input_history),
    path('clear_input_history', views.clear_input_history),
    path('get_graph_data', views.get_graph_data),    
    path('server_status', views.server_status),

    path('register', auth.register),
    path('sign_in', auth.sign_in),
    path('reset_password', auth.reset_password),
    path('verify_email/<str:jwt_code>', auth.verify_email, name='verify_email'),
    path('leave_feedback', auth.leave_feedback),
]
