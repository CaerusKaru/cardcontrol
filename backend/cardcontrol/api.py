from cardcontrol.models import UserAccount, Card, AccessPoint, Request, Resource, Domain
from tastypie.resources import ModelResource, NamespacedModelResource
from tastypie.authorization import Authorization
from tastypie.resources import ALL, ALL_WITH_RELATIONS
from tastypie.exceptions import NotFound
from tastypie import fields
from tastypie.fields import ToManyField
from tastypie.exceptions import BadRequest


class CardResource(ModelResource):

    class Meta:
        always_return_data = True 
        queryset = Card.objects.all()
        list_allowed_methods = ['get', 'put', 'post']
        detail_allowed_methods = ['get', 'put', 'post']
        resource_name = 'card'
        authorization = Authorization()
        excludes = ['created_at', 'modified_at']
        filtering = {
            'utln': ALL
        }


class UserAccountResource(ModelResource):
    card = fields.ToOneField('cardcontrol.api.CardResource', 'card')
    access_points = fields.ManyToManyField('cardcontrol.api.AccessPointResource', 'access_points', full=True)
    resources_managed = fields.ManyToManyField('cardcontrol.api.ResourceResource', 'resources_managed')

    def get_schema(self, request, **kwargs):
        raise NotFound

    class Meta:
        queryset = UserAccount.objects.all()
        list_allowed_methods = ['get', 'put', 'post']
        detail_allowed_methods = ['get', 'put', 'post']
        resource_name = 'user_account'
        authorization = Authorization()
        excludes = ['created_at', 'modified_at']
        filtering = {
            'utln': ALL_WITH_RELATIONS,
            'manager_level': ALL
        }


class AccessPointResource(ModelResource):

    created_by = fields.ToOneField(UserAccountResource, 'created_by')
    modified_by = fields.ToOneField(UserAccountResource, 'modified_by')
    parent = fields.ForeignKey('cardcontrol.api.ResourceResource', 'parent')

    #parents = fields.ManyToManyField('cardcontrol.api.ResourceResource', 'resource_children', blank=True)
    
    def get_schema(self, request, **kwargs):
        raise NotFound

    class Meta:
        always_return_data = True
        queryset = AccessPoint.objects.all()
        list_allowed_methods = ['get', 'put', 'post']
        resource_name = 'access_point'
        detail_allowed_methods = ['get', 'put', 'post']
        authorization = Authorization()
        excludes = ['created_by', 'modified_by', 'created_at', 'modified_at']
        filtering = {
            'parent': ALL_WITH_RELATIONS,
            'access_point_name': ALL
        }


class ResourceResource(ModelResource):
    created_by = fields.ToOneField(UserAccountResource, 'created_by')
    modified_by = fields.ToOneField(UserAccountResource, 'modified_by')
    parent = fields.ForeignKey('cardcontrol.api.DomainResource', 'parent')
    children = fields.ToManyField('cardcontrol.api.AccessPointResource', 'accesspoint_parent', blank=True, full=True)

    #children = fields.ManyToManyField('cardcontrol.api.AccessPointResource', 'children', blank=True, full=True)
    #parents = fields.ManyToManyField('cardcontrol.api.DomainResource', 'domain_resource_children', blank=True)

    class Meta:
        always_return_data = True
        queryset = Resource.objects.all()
        list_allowed_methods = ['get', 'put', 'post']
        resource_name = 'resource'
        detail_allowed_methods = ['get', 'put', 'post']
        authorization = Authorization()
        excludes = ['created_by', 'modified_by', 'created_at', 'modified_at']
        filtering = {
            'city': ALL,
            'zipcode': ALL,
            'address': ALL,
            'state': ALL,
            'country': ALL,
            'resource_name': ALL,
            'children': ALL_WITH_RELATIONS,
            'parent': ALL_WITH_RELATIONS
        }


class DomainResource(ModelResource):
    created_by = fields.ToOneField(UserAccountResource, 'created_by')
    modified_by = fields.ToOneField(UserAccountResource, 'modified_by')
    parent = fields.ForeignKey('cardcontrol.api.DomainResource', 'parent', blank=True, null=True)
    resource_children = fields.ToManyField('cardcontrol.api.ResourceResource', 'resource_parent', blank=True, full=True)
    domain_children = fields.ToManyField('cardcontrol.api.DomainResource', 'domain_parent', blank=True, full=True)
    #resource_children = fields.ManyToManyField('cardcontrol.api.ResourceResource', 'resource_children', full=True)
    #domain_children = fields.ManyToManyField('cardcontrol.api.DomainResource', 'domain_children', full=True)
    #parents = fields.ManyToManyField('cardcontrol.api.DomainResource', 'domain_domain_children')

    class Meta:
        always_return_data = True
        queryset = Domain.objects.all()
        list_allowed_methods = ['get', 'put', 'post']
        resource_name = 'domain'
        detail_allowed_methods = ['get', 'put', 'post']
        authorization = Authorization()
        excludes = ['created_by', 'modified_by', 'created_at', 'modified_at']
        filtering = {
            'domain_name': ALL,
            'domain_children': ALL_WITH_RELATIONS,
            'resource_children': ALL_WITH_RELATIONS,
            'parent': ALL_WITH_RELATIONS
        }


class RequestResource(ModelResource):

    created_by = fields.ToOneField(UserAccountResource, 'created_by')
    modified_by = fields.ToOneField(UserAccountResource, 'modified_by')
    new_card = fields.ToOneField(CardResource, 'new_card')
    new_access_points = fields.ManyToManyField('cardcontrol.api.AccessPointResource', 'new_access_points')
    user = fields.ToOneField(UserAccountResource, 'user')

    def get_schema(self, request, **kwargs):
        raise NotFound

    class Meta:
        always_return_data = True 
        queryset = Request.objects.all()
        list_allowed_methods = ['get', 'put', 'post']
        detail_allowed_methods = ['get', 'put', 'post']
        resource_name = 'request'
        authorization = Authorization()

        excludes = ['created_by', 'modified_by']
        filtering = {
            'created_at': ALL,
            'modified_at': ALL,
            'user': ALL_WITH_RELATIONS,
            'request_level': ALL_WITH_RELATIONS,
            'status': ALL_WITH_RELATIONS
        }
