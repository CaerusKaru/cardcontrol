from django.contrib import admin

from .models import UserAccount, AccessPoint, Card, Request

admin.site.register(UserAccount)
admin.site.register(AccessPoint)
admin.site.register(Card)
admin.site.register(Request)
