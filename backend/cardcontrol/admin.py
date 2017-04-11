"""
Admin panel for CardControl Django application.
"""
from django.contrib import admin

from .models import UserAccount, AccessPoint, Card
from .models import EditedCard, Request, Resource
from .models import Domain

admin.site.register(UserAccount)
admin.site.register(AccessPoint)
admin.site.register(Card)
admin.site.register(EditedCard)
admin.site.register(Request)
admin.site.register(Domain)
admin.site.register(Resource)
