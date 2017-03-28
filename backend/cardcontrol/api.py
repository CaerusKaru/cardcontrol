from cardcontrol.models import ManagerAccount, UserAccount, Card, Door, Request
from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from tastypie import fields, utils

class ManagerAccountResource(ModelResource):
    class Meta:
        queryset = ManagerAccount.objects.all()
        resource_name = 'manager_account'
        authorization = Authorization()
        filtering = {
            'utln': ALL,
            'manager_level' : ALL
        }

class UserAccountResource(ModelResource):
    created_by = fields.ToOneField(ManagerAccountResource, 'created_by')
    modified_by = fields.ToOneField(ManagerAccountResource, 'modified_by')

    class Meta:
        queryset = UserAccount.objects.all()
        resource_name = 'user_account'
        authorization = Authorization()
        excludes = ['created_by', 'modified_by', 'created_at', 'modified_at']
        filtering = {
            'utln': ALL
        }

class CardResource(ModelResource):
    created_by = fields.ToOneField(ManagerAccountResource, 'created_by')
    modified_by = fields.ToOneField(ManagerAccountResource, 'modified_by')
    class Meta:
        queryset = Card.objects.all()
        resource_name = 'card'
        authorization = Authorization()
        excludes = ['created_by', 'modified_by', 'created_at', 'modified_at']
        filtering = {
            'utln': ALL,
            'doors' : ALL_WITH_RELATIONS
        }

class DoorResource(ModelResource):
    created_by = fields.ToOneField(ManagerAccountResource, 'created_by')
    modified_by = fields.ToOneField(ManagerAccountResource, 'modified_by')
    class Meta:
        queryset = Door.objects.all()
        resource_name = 'door'
        authorization = Authorization()
        excludes = ['created_by', 'modified_by', 'created_at', 'modified_at']
        filtering = {
            'address': ALL,
            'building_name' : ALL,
            'door_name' : ALL
        }

class RequestResource(ModelResource):
    created_by = fields.ToOneField(ManagerAccountResource, 'created_by')
    modified_by = fields.ToOneField(ManagerAccountResource, 'modified_by')
    class Meta:
        queryset = Request.objects.all()
        resource_name = 'request'
        authorization = Authorization()
        excludes = ['created_by', 'modified_by', 'created_at', 'modified_at']
        

