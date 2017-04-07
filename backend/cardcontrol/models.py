from django.db import models
import datetime


class Card(models.Model):
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
    created_at = models.DateTimeField(default=datetime.datetime.now, editable=False)
    modified_at = models.DateTimeField(default=datetime.datetime.now)
    
    class Meta:
        app_label = 'cardcontrol'
        unique_together = ('first_name', 'last_name', 'middle_initial', 'utln', 'student_type', 'jumbocash_id', 'birth_date', 'school', 'class_year', 'barcode')

    def __str__(self):
        return self.utln


class UserAccount(models.Model):
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    utln = models.CharField(max_length=10, unique=True)
    card = models.ForeignKey(Card, on_delete=models.CASCADE)
    access_points = models.ManyToManyField('AccessPoint', blank=True)
    resources_managed = models.ManyToManyField('Resource', blank=True)
    created_at = models.DateTimeField(default=datetime.datetime.now, editable=False)
    modified_at = models.DateTimeField(default=datetime.datetime.now)
    manager_level = models.IntegerField(default=0)
   
    class Meta:
        app_label = 'cardcontrol'

    def __str__(self):
        return self.utln


class AccessPoint(models.Model):
    access_point_name = models.CharField(max_length=60)
    created_by = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='%(class)s_created_by')
    modified_by = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='%(class)s_modified_by')
    created_at = models.DateTimeField(default=datetime.datetime.now, editable=False)
    modified_at = models.DateTimeField(default=datetime.datetime.now)
    parent = models.ForeignKey('Resource', on_delete=models.CASCADE, related_name='%(class)s_parent')

    class Meta:
        app_label = 'cardcontrol'

    def __str__(self):
        return self.access_point_name


class Resource(models.Model):
    zipcode = models.CharField(max_length=10)
    address = models.CharField(max_length=60)
    city = models.CharField(max_length=60)
    state = models.CharField(max_length=60)
    country = models.CharField(max_length=60)
    resource_name = models.CharField(max_length=60)
   #children = models.ManyToManyField('AccessPoint', blank=True, related_name='%(class)s_children')
    parent = models.ForeignKey('Domain', on_delete=models.CASCADE, related_name='%(class)s_parent')
    created_by = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='%(class)s_created_by')
    modified_by = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='%(class)s_modified_by')
    created_at = models.DateTimeField(default=datetime.datetime.now, editable=False)
    modified_at = models.DateTimeField(default=datetime.datetime.now)
   
    class Meta:
        app_label = 'cardcontrol'
        unique_together = ('zipcode', 'address', 'city', 'resource_name')

    def __str__(self):
        return self.resource_name


class Domain(models.Model):
    domain_name = models.CharField(max_length=60, unique=True)
   #domain_children = models.ManyToManyField('Domain', blank=True, related_name='%(class)s_domain_children')
   #resource_children = models.ManyToManyField('Resource', blank=True, related_name='%(class)s_resource_children')
    parent = models.ForeignKey('Domain', on_delete=models.CASCADE, related_name='%(class)s_parent', blank=True, null=True)
    created_by = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='%(class)s_created_by')
    modified_by = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='%(class)s_modified_by')
    created_at = models.DateTimeField(default=datetime.datetime.now, editable=False)
    modified_at = models.DateTimeField(default=datetime.datetime.now)
    
    class Meta:
        app_label = 'cardcontrol'

    def __str__(self):
        return self.domain_name


class Request(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    new_card = models.ForeignKey(Card, on_delete=models.CASCADE, null=True, blank=True)
    new_access_points = models.ManyToManyField(AccessPoint, blank=True)
    request_level = models.IntegerField()
    status = models.IntegerField()
    reason = models.CharField(max_length=200, null=True, blank=True)
    feedback = models.CharField(max_length=200, null=True, blank=True)
    created_by = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='%(class)s_created_by')
    modified_by = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='%(class)s_modified_by')
    created_at = models.DateTimeField(default=datetime.datetime.now, editable=False)
    modified_at = models.DateTimeField(default=datetime.datetime.now)
    
    class Meta:
        app_label = 'cardcontrol'

    def __str__(self):
        return self.user

