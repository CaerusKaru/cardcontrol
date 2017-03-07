#!/bin/bash
d=`dirname "$0"`
rm $d/cardcontrol/migrations/00* 2> /dev/null
$d/../utils/bobby_tables.sh
python $d/manage.py makemigrations
python $d/manage.py migrate auth --database default
python $d/manage.py migrate admin --database default
python $d/manage.py migrate contenttypes --database default
python $d/manage.py migrate sessions --database default
python $d/manage.py migrate cardcontrol --database cardcontrol
#python $d/manage.py createsuperuser

