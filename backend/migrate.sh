#!/bin/bash

set -eEuo pipefail
IFS=$'\n\t'

goodc="\033[38;5;10m"
qc="\033[38;5;222m"
badc="\033[38;5;09m"
noc="\033[38;5;15m"
d=$(dirname "$0")

echo -e "${goodc}Removing previous migration files.${noc}"
set +e
rm $d/cardcontrol/migrations/00* 2> /dev/null
set -e
echo -e "${goodc}Deleting and recreating databases.${noc}"
$d/../utils/drop_and_create.sh
echo -e "${goodc}Making new migrations for Django.${noc}"
python3.6 $d/manage.py makemigrations
echo -e "${goodc}Executing migrations.${noc}"
python3.6 $d/manage.py migrate auth --database default
python3.6 $d/manage.py migrate admin --database default
python3.6 $d/manage.py migrate contenttypes --database default
python3.6 $d/manage.py migrate sessions --database default
python3.6 $d/manage.py migrate tastypie --database default
python3.6 $d/manage.py migrate cardcontrol --database cardcontrol
#echo "Creating new superuser for Django admin panel."
#python3.6 $d/manage.py createsuperuser

