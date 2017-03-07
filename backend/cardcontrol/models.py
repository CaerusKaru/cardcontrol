from django.db import models

class Accounts(models.Model):
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    utln = models.CharField(max_length=10)
    manager_level = models.IntegerField(default=0)
    class Meta:
        app_label = 'cardcontrol'

    def __unicode__(self):
        return self.utln

class Doors(models.Model):
    address = models.CharField(max_length=120)
    building_name = models.CharField(max_length=120)
    door_name = models.CharField(max_length=120)
    created_by = models.ForeignKey(Accounts, on_delete=models.CASCADE)
    modified_by = models.ForeignKey(Accounts, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_by = models.DateTimeField(auto_now=True)
    class Meta:
        app_label = 'cardcontrol'

    def __unicode__(self):
        return self.door_name + " @ " + self.building_name

class Ids(models.Model):
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
    doors = models.ManyToManyField(Doors)
    created_by = models.ForeignKey(Accounts, on_delete=models.CASCADE)
    modified_by = models.ForeignKey(Accounts, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_by = models.DateTimeField(auto_now=True)
    class Meta:
        app_label = 'cardcontrol'

    def __unicode__(self):
        return self.utln



