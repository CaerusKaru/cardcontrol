"""
Models for the MVC setup of the CardControl applications. Defines the
means by which the application interfaces with the database.
"""

import datetime
from django.db import models


class Card(models.Model):
    """
    A single ID card, with all relevant fields.
    """
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    middle_initial = models.CharField(max_length=1)
    utln = models.CharField(max_length=10, unique=True)
    student_type = models.CharField(max_length=20)
    jumbocash_id = models.IntegerField()
    birth_date = models.DateField()
    school = models.CharField(max_length=30)
    class_year = models.IntegerField()
    barcode = models.IntegerField()
    created_at = models.DateTimeField(default=datetime.datetime.now,
                                      editable=False)
    modified_at = models.DateTimeField(default=datetime.datetime.now)

    class Meta:
        """
        Meta information for a Card, defining additional properties.
        """
        app_label = 'cardcontrol'
        unique_together = ('first_name', 'last_name', 'middle_initial',
                           'utln', 'student_type', 'jumbocash_id',
                           'birth_date', 'school', 'class_year', 'barcode')

    def __str__(self):
        return self.utln


class EditedCard(models.Model):
    """
    A card which has been edited by a user, and submitted to a
    manager for approval.
    """
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    middle_initial = models.CharField(max_length=1)
    utln = models.CharField(max_length=10)
    student_type = models.CharField(max_length=20)
    jumbocash_id = models.IntegerField()
    birth_date = models.DateField()
    school = models.CharField(max_length=30)
    class_year = models.IntegerField()
    barcode = models.IntegerField()
    created_at = models.DateTimeField(default=datetime.datetime.now,
                                      editable=False)
    modified_at = models.DateTimeField(default=datetime.datetime.now)

    class Meta:
        """
        Meta information for an EditedCard, defining additional properties.
        """
        app_label = 'cardcontrol'
        unique_together = ('first_name', 'last_name', 'middle_initial',
                           'utln', 'student_type', 'jumbocash_id',
                           'birth_date', 'school', 'class_year', 'barcode')

    def __str__(self):
        return self.utln


class UserAccount(models.Model):
    """
    The account of some user of the system; users are either
    a manager or an unpriveleged user, and have access to some
    places, and manage others.
    """
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    utln = models.CharField(max_length=10, unique=True)
    card = models.ForeignKey(Card, on_delete=models.CASCADE)
    access_points = models.ManyToManyField(
        'AccessPoint', related_name='%(class)s_access_points')
    access_points_managed = models.ManyToManyField(
        'AccessPoint', related_name='%(class)s_access_points_managed')
    created_at = models.DateTimeField(default=datetime.datetime.now,
                                      editable=False)
    modified_at = models.DateTimeField(default=datetime.datetime.now)
    manager_level = models.IntegerField(default=0)

    class Meta:
        """
        Meta information for a UserAccount, defining additional properties.
        """
        app_label = 'cardcontrol'

    def __str__(self):
        return self.utln


class AccessPoint(models.Model):
    """
    An access point, e.g. a door or a web application, to which
    a user may have access.
    """
    access_point_name = models.CharField(max_length=60)
    created_by = models.ForeignKey(UserAccount, on_delete=models.CASCADE,
                                   related_name='%(class)s_created_by')
    modified_by = models.ForeignKey(UserAccount, on_delete=models.CASCADE,
                                    related_name='%(class)s_modified_by')
    created_at = models.DateTimeField(default=datetime.datetime.now,
                                      editable=False)
    modified_at = models.DateTimeField(default=datetime.datetime.now)
    parent = models.ForeignKey('Resource', on_delete=models.CASCADE,
                               related_name='%(class)s_parent')
    class Meta:
        """
        Meta information for an AccessPoint, defining additional properties.
        """
        app_label = 'cardcontrol'

    def __str__(self):
        return self.access_point_name


class Resource(models.Model):
    """
    A resource, which is a collection of access points, is a
    discrete element of the system for which CardControl manages
    access control; resources have a distinct address.
    """
    zipcode = models.CharField(max_length=10)
    address = models.CharField(max_length=60)
    city = models.CharField(max_length=60)
    state = models.CharField(max_length=60)
    country = models.CharField(max_length=60)
    resource_name = models.CharField(max_length=60)
    parent = models.ForeignKey('Domain',
                               on_delete=models.CASCADE,
                               related_name='%(class)s_parent')
    created_by = models.ForeignKey(UserAccount, on_delete=models.CASCADE,
                                   related_name='%(class)s_created_by')
    modified_by = models.ForeignKey(UserAccount, on_delete=models.CASCADE,
                                    related_name='%(class)s_modified_by')
    created_at = models.DateTimeField(default=datetime.datetime.now,
                                      editable=False)
    modified_at = models.DateTimeField(default=datetime.datetime.now)

    class Meta:
        """
        Meta information for a Resource, defining additional properties.
        """
        app_label = 'cardcontrol'
        unique_together = ('zipcode', 'address', 'city', 'resource_name')

    def __str__(self):
        return self.resource_name


class Domain(models.Model):
    """
    A domain is a collection of resources, used to hierarchially
    organize the system.
    """
    domain_name = models.CharField(max_length=60, unique=True)
    parent = models.ForeignKey('Domain',
                               on_delete=models.CASCADE,
                               related_name='%(class)s_parent', null=True)
    created_by = models.ForeignKey(UserAccount, on_delete=models.CASCADE,
                                   related_name='%(class)s_created_by')
    modified_by = models.ForeignKey(UserAccount, on_delete=models.CASCADE,
                                    related_name='%(class)s_modified_by')
    created_at = models.DateTimeField(default=datetime.datetime.now,
                                      editable=False)
    modified_at = models.DateTimeField(default=datetime.datetime.now)

    class Meta:
        """
        Meta information for a Domain, defining additional properties.
        """
        app_label = 'cardcontrol'

    def __str__(self):
        return self.domain_name


class Request(models.Model):
    """
    A request is a connection of a user account to a list of new
    access points and an edited_card.
    """
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    new_card = models.ForeignKey(EditedCard, on_delete=models.CASCADE,
                                 null=True)
    new_access_points = models.ManyToManyField(AccessPoint, blank=True,
				    related_name='%(class)s_new_access_points')
    granted_access_points = models.ManyToManyField(AccessPoint, blank=True,
                                    related_name='%(class)s_granted_access_points')
    request_level = models.IntegerField()
    status = models.IntegerField()
    reason = models.CharField(max_length=200, null=True)
    feedback = models.CharField(max_length=200, null=True)
    created_by = models.ForeignKey(UserAccount, on_delete=models.CASCADE,
                                   related_name='%(class)s_created_by')
    modified_by = models.ForeignKey(UserAccount, on_delete=models.CASCADE,
                                    related_name='%(class)s_modified_by')
    created_at = models.DateTimeField(default=datetime.datetime.now,
                                      editable=False)
    modified_at = models.DateTimeField(default=datetime.datetime.now)

    class Meta:
        """
        Meta information for a Request, defining additional properties.
        """
        app_label = 'cardcontrol'

    def __str__(self):
        return self.user
