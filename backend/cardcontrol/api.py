from cardcontrol.models import Account, Card, Door
from tastypie.resources import ModelResource
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS

class AccountResource(ModelResource):
    class Meta:
        queryset = Account.objects.all()
        resource_name = 'account'
        authorization = Authorization()
        filtering = {
            'utln': ALL,
            'manager_level' : ALL
        }

class CardResource(ModelResource):
    class Meta:
        queryset = Card.objects.all()
        resource_name = 'card'
        authorization = Authorization()
        excludes = ['created_by', 'modified_by', 'created_at', 'modified_by']
        filtering = {
            'utln': ALL,
            'doors' : ALL_WITH_RELATIONS
        }

class DoorResource(ModelResource):
    class Meta:
        queryset = Door.objects.all()
        resource_name = 'door'
        authorization = Authorization()
        excludes = ['created_by', 'modified_by', 'created_at', 'modified_by']
        filtering = {
            'address': ALL,
            'building_name' : ALL,
            'door_name' : ALL
        }

