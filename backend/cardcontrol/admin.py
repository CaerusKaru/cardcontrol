from django.contrib import admin

from .models import ManagerAccount, UserAccount, Door, Card, Request

admin.site.register(ManagerAccount)
admin.site.register(UserAccount)
admin.site.register(Door)
admin.site.register(Card)
admin.site.register(Request)
