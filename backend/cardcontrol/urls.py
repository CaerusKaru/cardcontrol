"""
Django views for the CardControl application. Since our application has a
frontend of static content built in Angular, we do not have any significant
views here. Note that there are some views in the backend for infrastrucuture
related tasks.
"""

from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
]
