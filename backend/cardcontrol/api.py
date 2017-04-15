"""
Tastypie API definition for CardControl application.
"""

from cardcontrol.models import UserAccount, Card, EditedCard
from cardcontrol.models import AccessPoint, Request, Resource, Domain
from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.resources import ALL, ALL_WITH_RELATIONS
from tastypie import fields
from tastypie.fields import ToManyField
from tastypie.http import HttpBadRequest
from tastypie.cache import SimpleCache

CACHE = False


class CardResource(ModelResource):
    """
    Tastypie API resource for Card.
    """
    class Meta:
        """
        Additional configuration for fields, allowed HTTP methods,
        etc. for this API resource.
        """
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

    @staticmethod
    def hydrate_id(bundle):
        """
        Remove the id from any bundle passed to the API.
        """
        try:
            if bundle.data['id'] is not None:
                bundle.data['id'] = None
        except KeyError:
            return bundle
        return bundle

    @staticmethod
    def hydrate_resource_uri(bundle):
        """
        Remove the URI string from any bundle passed to the API.
        """
        try:
            if bundle.data['resource_uri'] is not None:
                bundle.data['resource_uri'] = None
        except KeyError:
            return bundle
        return bundle


class EditedCardResource(ModelResource):
    """
    Tastypie API resource for EditedCard.
    """
    class Meta:
        """
        Additional configuration for fields, allowed HTTP methods,
        etc. for this API resource.
        """
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

    @staticmethod
    def hydrate_id(bundle):
        """
        Remove the id from any bundle passed to the API.
        """
        try:
            if bundle.data['id'] is not None:
                bundle.data['id'] = None
        except KeyError:
            return bundle
        return bundle

    @staticmethod
    def hydrate_resource_uri(bundle):
        """
        Remove the URI string from any bundle passed to the API.
        """
        try:
            if bundle.data['resource_uri'] is not None:
                bundle.data['resource_uri'] = None
        except KeyError:
            return bundle
        return bundle


class UserAccountResource(ModelResource):
    """
    Tastypie API resource for UserAccount.
    """
    card = fields.ToOneField('cardcontrol.api.CardResource', 'card')
    access_points = ToManyField('cardcontrol.api.AccessPointResource',
                                'access_points', blank=True, full=True)
    access_points_managed = ToManyField('cardcontrol.api.AccessPointResource',
                                        'access_points_managed',
                                        blank=True, full=True)
    
    class Meta:
        """
        Additional configuration for fields, allowed HTTP methods,
        etc. for this API resource.
        """
        queryset = UserAccount.objects.all()
        always_return_data = True
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

    @staticmethod
    def hydrate_id(bundle):
        """
        Remove the id from any bundle passed to the API.
        """
        try:
            if bundle.data['id'] is not None:
                bundle.data['id'] = None
        except KeyError:
            return bundle
        return bundle

    @staticmethod
    def hydrate_resource_uri(bundle):
        """
        Remove the URI string from any bundle passed to the API.
        """
        try:
            if bundle.data['resource_uri'] is not None:
                bundle.data['resource_uri'] = None
        except KeyError:
            return bundle
        return bundle


class AccessPointResource(ModelResource):
    """
    Tastypie API resource for AccessPoint.
    """
    created_by = fields.ToOneField(UserAccountResource, 'created_by')
    modified_by = fields.ToOneField(UserAccountResource, 'modified_by')
    parent = fields.ForeignKey('cardcontrol.api.ResourceResource', 'parent')
    users = fields.ToManyField('cardcontrol.api.UserAccountResource',
                               'useraccount_access_points', blank=True)

    class Meta:
        """
        Additional configuration for fields, allowed HTTP methods,
        etc. for this API resource.
        """
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
            'access_point_name': ALL,
            'id': ALL
        }

    @staticmethod
    def hydrate_id(bundle):
        """
        Remove the id from any bundle passed to the API.
        """
        try:
            if bundle.data['id'] is not None:
                bundle.data['id'] = None
        except KeyError:
            return bundle
        return bundle

    @staticmethod
    def hydrate_resource_uri(bundle):
        """
        Remove the URI string from any bundle passed to the API.
        """
        try:
            if bundle.data['resource_uri'] is not None:
                bundle.data['resource_uri'] = None
        except KeyError:
            return bundle
        return bundle


class ResourceResource(ModelResource):
    """
    Tastypie API resource for Resource.
    """
    created_by = fields.ToOneField(UserAccountResource, 'created_by')
    modified_by = fields.ToOneField(UserAccountResource, 'modified_by')
    parent = fields.ForeignKey('cardcontrol.api.DomainResource', 'parent')
    children = fields.ToManyField('cardcontrol.api.AccessPointResource',
                                  'accesspoint_parent', full=True)

    class Meta:
        """
        Additional configuration for fields, allowed HTTP methods,
        etc. for this API resource.
        """
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

    @staticmethod
    def hydrate_id(bundle):
        """
        Remove the id from any bundle passed to the API.
        """
        try:
            if bundle.data['id'] is not None:
                bundle.data['id'] = None
        except KeyError:
            return bundle
        return bundle

    @staticmethod
    def hydrate_resource_uri(bundle):
        """
        Remove the URI string from any bundle passed to the API.
        """
        try:
            if bundle.data['resource_uri'] is not None:
                bundle.data['resource_uri'] = None
        except KeyError:
            return bundle
        return bundle


class DomainResource(ModelResource):
    """
    Tastypie API resource for Domain.
    """
    created_by = fields.ToOneField(UserAccountResource, 'created_by')
    modified_by = fields.ToOneField(UserAccountResource, 'modified_by')
    parent = fields.ForeignKey('cardcontrol.api.DomainResource',
                               'parent', null=True)
    resource_children = fields.ToManyField('cardcontrol.api.ResourceResource',
                                           'resource_parent', full=True)
    domain_children = fields.ToManyField('cardcontrol.api.DomainResource',
                                         'domain_parent', full=True)

    class Meta:
        """
        Additional configuration for fields, allowed HTTP methods,
        etc. for this API resource.
        """
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

    @staticmethod
    def hydrate_parent(bundle):
        """
        Disallow creation of domains with a parent of null which are not
        the default root domain.
        """
        if bundle.data['parent'] is None:
            return HttpBadRequest({'code': 401, 'message':
                                   "Creation of new domains"
                                   + "with no parent is not allowed."})
        return bundle

    @staticmethod
    def hydrate_id(bundle):
        """
        Remove the id from any bundle passed to the API.
        """
        try:
            if bundle.data['id'] is not None:
                bundle.data['id'] = None
        except KeyError:
            return bundle
        return bundle

    @staticmethod
    def hydrate_resource_uri(bundle):
        """
        Remove the URI string from any bundle passed to the API.
        """
        try:
            if bundle.data['resource_uri'] is not None:
                bundle.data['resource_uri'] = None
        except KeyError:
            return bundle
        return bundle


class RequestResource(ModelResource):
    """
    Tastypie API resource for Requests.
    """
    created_by = fields.ToOneField(UserAccountResource, 'created_by')
    modified_by = fields.ToOneField(UserAccountResource, 'modified_by')
    new_card = fields.ToOneField(EditedCardResource, 'new_card', null=True)
    cur_card = fields.ToOneField(CardResource, 'cur_card', null=True)
    new_access_points = ToManyField('cardcontrol.api.AccessPointResource',
                                    'new_access_points', blank=True)
    granted_access_points = ToManyField('cardcontrol.api.AccessPointResource',
                                        'granted_access_points', blank=True)
    user = fields.ToOneField(UserAccountResource, 'user')

    class Meta:
        """
        Additional configuration for fields, allowed HTTP methods,
        etc. for this API resource.
        """
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
            'status': ALL_WITH_RELATIONS,
            'new_access_points': ALL_WITH_RELATIONS,
            'cur_card': ALL_WITH_RELATIONS,
            'granted_access_points': ALL_WITH_RELATIONS
        }

    @staticmethod
    def hydrate_id(bundle):
        """
        Remove the id from any bundle passed to the API.
        """
        try:
            if bundle.data['id'] is not None:
                bundle.data['id'] = None
        except KeyError:
            return bundle
        return bundle

    @staticmethod
    def hydrate_resource_uri(bundle):
        """
        Remove the URI string from any bundle passed to the API.
        """
        try:
            if bundle.data['resource_uri'] is not None:
                bundle.data['resource_uri'] = None
        except KeyError:
            return bundle
        return bundle
