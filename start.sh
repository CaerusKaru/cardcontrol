#!/bin/bash
d=`dirname "$0"`
$d/utils/env-check.sh
$d/backend/migrate.sh
psql -d default < $d/utils/recreate_database.sql
python $d/backend/manage.py runserver &
npm install
ng serve &


