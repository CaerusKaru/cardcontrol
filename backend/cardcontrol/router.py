"""
Database router for CardControl application. The routes all Django-specific
traffic, e.g. admin panel panel logins, to the default database and all
cardcontrol-specific requests to an auxilliary, larger cardcontrol database.
"""
from django.conf import settings


class DatabaseAppsRouter(object):
    """
    We have four main operations, which control the database
    passthroughs in our application.
    The architecture of this router was sourced from:
    http://diegobz.net/2011/02/10/django-database-router-using-settings/
    """

    @staticmethod
    def db_for_read(model, **dummy_hints):
        """"Point all read operations to the specific database."""
        if model._meta.app_label in settings.DATABASE_APPS_MAPPING:
            return settings.DATABASE_APPS_MAPPING[model._meta.app_label]
        return None

    @staticmethod
    def db_for_write(model, **dummy_hints):
        """Point all write operations to the specific database."""
        if model._meta.app_label in settings.DATABASE_APPS_MAPPING:
            return settings.DATABASE_APPS_MAPPING[model._meta.app_label]
        return None

    @staticmethod
    def allow_relation(obj1, obj2, **dummy_hints):
        """Allow any relation between apps that use the same database."""
        db_obj1 = settings.DATABASE_APPS_MAPPING.get(obj1._meta.app_label)
        db_obj2 = settings.DATABASE_APPS_MAPPING.get(obj2._meta.app_label)
        if db_obj1 and db_obj2:
            return db_obj1 == db_obj2
        return None

    @staticmethod
    def allow_syncdb(dbname, model):
        """Make sure that apps only appear in the related database."""
        if dbname in settings.DATABASE_APPS_MAPPING.values():
            applabel = settings.DATABASE_APPS_MAPPING.get(model._meta.app_label)
            return applabel == dbname
        elif model._meta.app_label in settings.DATABASE_APPS_MAPPING:
            return False
        return None
