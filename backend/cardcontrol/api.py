from cardcontrol.models import UserAccount, Card, EditedCard, AccessPoint, Request, Resource, Domain
from tastypie.resources import ModelResource, NamespacedModelResource
from tastypie.authorization import Authorization
from tastypie.resources import ALL, ALL_WITH_RELATIONS
from tastypie.exceptions import NotFound
from tastypie import fields
from tastypie.fields import ToManyField
from tastypie.exceptions import BadRequest
from tastypie.http import HttpBadRequest
from tastypie.cache import SimpleCache, NoCache

CACHE = False

class CardResource(ModelResource):
    class Meta:
        always_return_data = True 
        queryset = Card.objects.all()
        if CACHE:
            cache = SimpleCache()
        list_allowed_methods = ['get', 'put', 'post']
        detail_allowed_methods = ['get', 'put', 'post']
        resource_name = 'card'
        authorization = Authorization()
        excludes = ['created_at', 'modified_at']
        filtering = {
            'utln': ALL
        }

    def hydrate_id(self, bundle):
        try:
            if bundle.data['id'] is not None:
                bundle.data['id'] = None
        except KeyError:
            return bundle
        return bundle

    def hydrate_resource_uri(self, bundle):
        try:
            if bundle.data['resource_uri'] is not None:
                bundle.data['resource_uri'] = None
        except KeyError:
            return bundle
        return bundle


class EditedCardResource(ModelResource):
    class Meta:
        always_return_data = True
        queryset = EditedCard.objects.all()
        if CACHE:
            cache = SimpleCache()
        list_allowed_methods = ['get', 'put', 'post']
        detail_allowed_methods = ['get', 'put', 'post']
        resource_name = 'edited_card'
        authorization = Authorization()
        excludes = ['created_at', 'modified_at']
        filtering = {
            'utln': ALL
        }

    def hydrate_id(self, bundle):
        try:
            if bundle.data['id'] is not None:
                bundle.data['id'] = None
        except KeyError:
            return bundle
        return bundle

    def hydrate_resource_uri(self, bundle):
        try:
            if bundle.data['resource_uri'] is not None:
                bundle.data['resource_uri'] = None
        except KeyError:
            return bundle
        return bundle


class UserAccountResource(ModelResource):
    card = fields.ToOneField('cardcontrol.api.CardResource', 'card')
    access_points = fields.ManyToManyField('cardcontrol.api.AccessPointResource', 'access_points', blank=True, full=True)
    access_points_managed = fields.ManyToManyField('cardcontrol.api.AccessPointResource', 'access_points_managed', blank=True, full=True)
    resources_managed = fields.ManyToManyField('cardcontrol.api.ResourceResource', 'resources_managed', blank=True, full=True)
    domains_managed = fields.ManyToManyField('cardcontrol.api.DomainResource', 'domains_managed', blank=True, full=True)

    class Meta:
        queryset = UserAccount.objects.all()
        list_allowed_methods = ['get', 'put', 'post']
        detail_allowed_methods = ['get', 'put', 'post']
        resource_name = 'user_account'
        if CACHE:
            cache = SimpleCache()
        authorization = Authorization()
        excludes = ['created_at', 'modified_at']
        filtering = {
            'utln': ALL_WITH_RELATIONS,
            'manager_level': ALL
        }

    def hydrate_id(self, bundle):
        try:
            if bundle.data['id'] is not None:
                bundle.data['id'] = None
        except KeyError:
            return bundle
        return bundle

    def hydrate_resource_uri(self, bundle):
        try:
            if bundle.data['resource_uri'] is not None:
                bundle.data['resource_uri'] = None
        except KeyError:
            return bundle
        return bundle


class AccessPointResource(ModelResource):
    created_by = fields.ToOneField(UserAccountResource, 'created_by')
    modified_by = fields.ToOneField(UserAccountResource, 'modified_by')
    parent = fields.ForeignKey('cardcontrol.api.ResourceResource', 'parent')

    class Meta:
        always_return_data = True
        queryset = AccessPoint.objects.all()
        list_allowed_methods = ['get', 'put', 'post']
        resource_name = 'access_point'
        if CACHE:
            cache = SimpleCache()
        detail_allowed_methods = ['get', 'put', 'post']
        authorization = Authorization()
        excludes = ['created_by', 'modified_by', 'created_at', 'modified_at']
        filtering = {
            'parent': ALL_WITH_RELATIONS,
            'access_point_name': ALL
        }

    def hydrate_id(self, bundle):
        try:
            if bundle.data['id'] is not None:
                bundle.data['id'] = None
        except KeyError:
            return bundle
        return bundle

    def hydrate_resource_uri(self, bundle):
        try:
            if bundle.data['resource_uri'] is not None:
                bundle.data['resource_uri'] = None
        except KeyError:
            return bundle
        return bundle


class ResourceResource(ModelResource):
    created_by = fields.ToOneField(UserAccountResource, 'created_by')
    modified_by = fields.ToOneField(UserAccountResource, 'modified_by')
    parent = fields.ForeignKey('cardcontrol.api.DomainResource', 'parent')
    children = fields.ToManyField('cardcontrol.api.AccessPointResource', 'accesspoint_parent', full=True)

    class Meta:
        always_return_data = True
        queryset = Resource.objects.all()
        list_allowed_methods = ['get', 'put', 'post']
        resource_name = 'resource'
        if CACHE:
             cache = SimpleCache()
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

    def hydrate_id(self, bundle):
        try:
            if bundle.data['id'] is not None:
                bundle.data['id'] = None
        except KeyError:
            return bundle
        return bundle

    def hydrate_resource_uri(self, bundle):
        try:
            if bundle.data['resource_uri'] is not None:
                bundle.data['resource_uri'] = None
        except KeyError:
            return bundle
        return bundle


class DomainResource(ModelResource):
    created_by = fields.ToOneField(UserAccountResource, 'created_by')
    modified_by = fields.ToOneField(UserAccountResource, 'modified_by')
    parent = fields.ForeignKey('cardcontrol.api.DomainResource', 'parent', null=True)
    resource_children = fields.ToManyField('cardcontrol.api.ResourceResource', 'resource_parent', full=True)
    domain_children = fields.ToManyField('cardcontrol.api.DomainResource', 'domain_parent', full=True)

    class Meta:
        always_return_data = True
        queryset = Domain.objects.all()
        list_allowed_methods = ['get', 'put', 'post', 'head']
        resource_name = 'domain'
        if CACHE:
            cache = SimpleCache()
        detail_allowed_methods = ['get', 'put', 'post', 'head']
        authorization = Authorization()
        excludes = ['created_by', 'modified_by', 'created_at', 'modified_at']
        filtering = {
            'domain_name': ALL,
            'domain_children': ALL_WITH_RELATIONS,
            'resource_children': ALL_WITH_RELATIONS,
            'parent': ALL_WITH_RELATIONS
        }

    def hydrate_parent(self, bundle):
        if bundle.data['parent'] is None:
            return HttpBadRequest({'code': 401, 'message': 'Creation of new domains with no parent is not allowed.'})
        return bundle

    def hydrate_id(self, bundle):
        try:
            if bundle.data['id'] is not None:
                bundle.data['id'] = None
        except KeyError:
            return bundle
        return bundle

    def hydrate_resource_uri(self, bundle):
        try:
            if bundle.data['resource_uri'] is not None:
                bundle.data['resource_uri'] = None
        except KeyError:
            return bundle
        return bundle


class RequestResource(ModelResource):
    created_by = fields.ToOneField(UserAccountResource, 'created_by')
    modified_by = fields.ToOneField(UserAccountResource, 'modified_by')
    new_card = fields.ToOneField(EditedCardResource, 'new_card', null=True)
    new_access_points = fields.ToManyField('cardcontrol.api.AccessPointResource', 'new_access_points', blank=True)
    user = fields.ToOneField(UserAccountResource, 'user')

    class Meta:
        always_return_data = True 
        queryset = Request.objects.all()
        list_allowed_methods = ['get', 'put', 'post']
        detail_allowed_methods = ['get', 'put', 'post']
        resource_name = 'request'
        if CACHE:
            cache = SimpleCache()
        authorization = Authorization()

        excludes = ['created_by', 'modified_by']
        filtering = {
            'created_at': ALL,
            'modified_at': ALL,
            'user': ALL_WITH_RELATIONS,
            'request_level': ALL_WITH_RELATIONS,
            'status': ALL_WITH_RELATIONS
        }

    def hydrate_id(self, bundle):
        try:
            if bundle.data['id'] is not None:
                bundle.data['id'] = None
        except KeyError:
            return bundle
        return bundle

    def hydrate_resource_uri(self, bundle):
        try:
            if bundle.data['resource_uri'] is not None:
                bundle.data['resource_uri'] = None
        except KeyError:
            return bundle
        return bundle


