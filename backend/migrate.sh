#!/bin/bash
rm cardcontrol/migrations/00*
../utils/bobby_tables.sh
python manage.py makemigrations
python manage.py migrate auth --database default
python manage.py migrate admin --database default
python manage.py migrate contenttypes --database default
python manage.py migrate sessions --database default
python manage.py migrate cardcontrol --database cardcontrol
python manage.py createsuperuser

