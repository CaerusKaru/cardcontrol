from tastypie.resources import ModelResource
from cardcontrol.models import Account, Card, Door

class AccountResource(ModelResource):
    class Meta:
        queryset = Account.objects.all()
        resource_name = 'account'

class CardResource(ModelResource):
    class Meta:
        queryset = Card.objects.all()
        resource_name = 'card'

class DoorResource(ModelResource):
    class Meta:
        queryset = Door.objects.all()
        resource_name = 'door'

