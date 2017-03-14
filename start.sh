#!/bin/bash
d=$(dirname "$0")
$d/utils/env-check.sh
$d/utils/stop_db.sh 2>/dev/null
$d/utils/start_db.sh
$d/backend/migrate.sh
psql -U M -d default < $d/utils/recreate_database.sql
python $d/backend/manage.py runserver &
npm install
ng serve &


