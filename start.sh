#!/bin/bash

set -eEuo pipefail
IFS=$'\n\t'

goodc="\033[38;5;10m"
qc="\033[38;5;222m"
badc="\033[38;5;09m"
noc="\033[38;5;15m"
d=$(dirname "$0")

echo -e "${goodc}Checking environment setup.${noc}"
$d/utils/env-check.sh

echo -e "${goodc}Stopping server.${noc}"
$d/stop.sh
echo -e "${goodc}Starting Database.${noc}"
$d/utils/start_db.sh

echo -e "${goodc}Beginning Django migrations.${noc}"
$d/backend/migrate.sh
echo -e "${goodc}Repopulating database with test data.${noc}"
psql -d postgres -U postgres < $d/utils/recreate_database.sql 1>/dev/null

expect <<- DONE
    spawn -ignore HUP python3.6 $d/backend/manage.py runserver 0.0.0.0:8000
    expect -re ".*Quit the server with CONTROL-C.*"
DONE

echo -e "${goodc}Checking frontend packages up to date.${noc}"
npm install

echo -e "${goodc}Starting frontent process.${noc}"
expect <<- DONE
    set timeout 120
    spawn -ignore HUP bash -ilc "ng serve --host 0.0.0.0 &"
    expect -re ".*webpack: Compiled successfully.*"
DONE

echo ""
echo -e "${goodc}Database, frontend, and backend started successfully.${noc}"
echo ""
