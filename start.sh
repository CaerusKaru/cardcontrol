#!/bin/bash

set -eEuo pipefail
IFS=$'\n\t'

goodc="\033[38;5;10m"
qc="\033[38;5;222m"
badc="\033[38;5;09m"
noc="\033[38;5;15m"
d=$(dirname "$0")

echo -e "${goodc}Checking environment setup.${noc}"
# set +e
$d/utils/env-check.sh
# set -e
echo -e "${goodc}Stopping server.${noc}"
$d/stop.sh
echo -e "${goodc}Starting Database.${noc}"
$d/utils/start_db.sh

echo -e "${goodc}Beginning Django migrations.${noc}"
$d/backend/migrate.sh
echo -e "${goodc}Repopulating database with test data.${noc}"
psql -d postgres -U postgres < $d/utils/recreate_database.sql 1>/dev/null

sql_c=$(python3.6 $d/backend/manage.py sqlsequencereset cardcontrol)
echo "${sql_c}" | psql -d cardcontrol -U postgres

expect <<- DONE
    spawn -ignore HUP python3.6 $d/backend/manage.py runserver 
    expect -re ".*Quit the server with CONTROL-C.*"
DONE

set +u
echo "$1"
if [[ -z $1 ]] || [[ $1 =~ ^[^aA].* ]]; then
echo -e "${goodc}Checking frontend packages up to date.${noc}"
npm install
echo -e "${goodc}Starting frontent process.${noc}"

#expect <<- DONE
#    set timeout 120
#    spawn -ignore HUP bash -ilc "ng serve &"
#    expect -re ".*webpack: Compiled successfully.*"
#DONE
fi

ng build -prod

expect <<- DONE
    spawn sudo uwsgi -T --die-on-term --ini $d/backend/uwsgi.ini
    expect -re ".*Operational MODE: preforking.*"
DONE

sudo nginx


echo ""
echo -e "${goodc}Database, frontend, and backend started successfully.${noc}"
echo ""


