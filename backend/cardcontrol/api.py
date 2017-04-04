from cardcontrol.models import UserAccount, Card, AccessPoint, Request
from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from tastypie import fields, utils

class CardResource(ModelResource):
    class Meta:
        queryset = Card.objects.all()
        list_allowed_methods = ['get', 'put', 'post']
        detail_allowed_methods = ['get', 'put', 'post']
        resource_name = 'card'
        authorization = Authorization()
        excludes = ['created_at', 'modified_at']

class UserAccountResource(ModelResource):
    card = fields.ToOneField('cardcontrol.api.CardResource', 'card')
    access_points = fields.ManyToManyField('cardcontrol.api.AccessPointResource', 'access_points')
    class Meta:
        queryset = UserAccount.objects.all()
        list_allowed_methods = ['get']
        detail_allowed_methods = ['get']
        resource_name = 'user_account'
        authorization = Authorization()
        excludes = ['created_at', 'modified_at']
        filtering = {
            'utln' : ALL_WITH_RELATIONS,
            'manager_level' : ALL
        }

class AccessPointResource(ModelResource):
    created_by = fields.ToOneField(UserAccountResource, 'created_by')
    modified_by = fields.ToOneField(UserAccountResource, 'modified_by')
    class Meta:
        queryset = AccessPoint.objects.all()
        list_allowed_methods = ['get', 'put', 'post']
        resource_name = 'access_point'
        detail_allowed_methods = ['get', 'put', 'post']
        authorization = Authorization()
        excludes = ['created_by', 'modified_by', 'created_at', 'modified_at']
        filtering = {
            'address': ALL,
            'resource_name' : ALL,
            'access_point_name' : ALL
        }

class RequestResource(ModelResource):
    created_by = fields.ToOneField(UserAccountResource, 'created_by')
    modified_by = fields.ToOneField(UserAccountResource, 'modified_by')
    new_card = fields.ToOneField(CardResource, 'new_card')
    new_access_points = fields.ManyToManyField('cardcontrol.api.AccessPointResource', 'new_access_points')
    user = fields.ToOneField(UserAccountResource, 'user')

    class Meta:
        queryset = Request.objects.all()
        list_allowed_methods = ['get', 'put', 'post']
        detail_allowed_methods = ['get', 'put', 'post']
        resource_name = 'request'
        authorization = Authorization()
        excludes = ['created_by', 'modified_by']
        filtering = {
            'request_level' : ALL_WITH_RELATIONS,
            'status' : ALL_WITH_RELATIONS
        }

