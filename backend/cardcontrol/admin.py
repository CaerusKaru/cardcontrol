from django.contrib import admin

from .models import UserAccount, AccessPoint, Card, Request, Resource

admin.site.register(UserAccount)
admin.site.register(AccessPoint)
admin.site.register(Card)
admin.site.register(Request)
admin.site.register(Resource)
