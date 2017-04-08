from django.contrib import admin

from .models import UserAccount, AccessPoint, Card, EditedCard, Request, Resource, Domain

admin.site.register(UserAccount)
admin.site.register(AccessPoint)
admin.site.register(Card)
admin.site.register(EditedCard)
admin.site.register(Request)
admin.site.register(Domain)
admin.site.register(Resource)
