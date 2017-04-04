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

    def __str__(self):
        return self.utln

class UserAccount(models.Model):
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    utln = models.CharField(max_length=10, unique=True)
    card = models.ForeignKey(Card, on_delete=models.CASCADE)
    access_points = models.ManyToManyField('AccessPoint')
    resources_managed = models.ManyToManyField('Resource')
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(default=datetime.datetime.now)
    manager_level = models.IntegerField(default=0)
    class Meta:
        app_label = 'cardcontrol'

    def __str__(self):
        return self.utln

class Resource(models.Model):
    zipcode = models.CharField(max_length=10)
    street = models.CharField(max_length=120)
    city = models.CharField(max_length=120)
    state = models.CharField(max_length=120)
    country = models.CharField(max_length=120)
    resource_name = models.CharField(max_length=120)
    created_by = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='%(class)s_created_by')
    modified_by = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='%(class)s_modified_by')
    created_at = models.DateTimeField(default=datetime.datetime.now, editable=False)
    modified_at = models.DateTimeField(default=datetime.datetime.now)
    class Meta:
        app_label = 'cardcontrol'
        unique_together = ('zipcode', 'street', 'city', 'resource_name')

    def __str__(self):
        return self.building_name


class AccessPoint(models.Model):
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE)
    access_point_name = models.CharField(max_length=120)
    created_by = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='%(class)s_created_by')
    modified_by = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='%(class)s_modified_by')
    created_at = models.DateTimeField(default=datetime.datetime.now, editable=False)
    modified_at = models.DateTimeField(default=datetime.datetime.now)
    class Meta:
        app_label = 'cardcontrol'
        unique_together = ('resource', 'access_point_name')

    def __str__(self):
        return self.access_point_name + " @ " + self.building_name

class Request(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    new_card = models.ForeignKey(Card, on_delete=models.CASCADE)
    new_access_points = models.ManyToManyField(AccessPoint)
    request_level = models.IntegerField()
    status = models.IntegerField()
    message = models.CharField(max_length=200, null=True, blank=True)
    created_by = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='%(class)s_created_by')
    modified_by = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='%(class)s_modified_by')
    created_at = models.DateTimeField(default=datetime.datetime.now, editable=False)
    modified_at = models.DateTimeField(default=datetime.datetime.now)
    class Meta:
        app_label = 'cardcontrol'
    
    def apply_filters(self, request, applicable_filters):
        distinct = request.GET.get('distinct', False) == 'True'
        if distinct:
            return self.get_object_list(request).filter(**applicable_filters).distinct()
        else:
            return self.get_object_list(request).filter(**applicable_filters)

    def __str__(self):
        return self.user

