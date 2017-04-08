#!/bin/bash

set -eEuo pipefail
IFS=$'\n\t'

goodc="\033[38;5;10m"
qc="\033[38;5;222m"
badc="\033[38;5;09m"
noc="\033[38;5;15m"
d=$(dirname "$0")


prod=1
aoff=1
abld=1

while [[ $# -gt 0 ]]; do
key="$1"

case $key in
    -a|--angular-off)
    aoff=0
    ;;
    -p|--prod)
    prod=0
    ;;
    -b|--build)
    abld=0
    ;;
    *)
    ;;
esac
shift # past argument or value
done

echo -e "${goodc}Running with -a ${aoff} -p ${prod} -b ${abld}.${noc}"

echo -e "${goodc}Checking environment setup.${noc}"
if [[ "${prod}" != "0" ]]; then set +e; fi
$d/utils/env-check.sh
if [[ "${prod}" != "0" ]]; then set -e; fi

if [[ "${prod}" == "0" ]]; then
        export DJANGO_DEBUG=''
fi

echo -e "${goodc}Stopping server.${noc}"
if [[ "$aoff" == "0" ]]; then
    $d/stop.sh -a
else
    $d/stop.sh
fi

if [[ "${abld}" == "0" ]]; then
    $d/ng-build.sh
fi;

echo -e "${goodc}Starting Database.${noc}"
$d/utils/start_db.sh

echo -e "${goodc}Beginning Django migrations.${noc}"
$d/backend/migrate.sh &>>$d/log/migrations.log
python $d/backend/manage.py createcachetable

echo -e "${goodc}Repopulating database with test data.${noc}"
psql -d postgres -U postgres < $d/utils/recreate_database.sql &>>$d/log/repopulate_db.log

sql_c=$(python3.6 $d/backend/manage.py sqlsequencereset cardcontrol)
echo "${sql_c}" | psql -d cardcontrol -U postgres &>>$d/log/sqlsequencereset.log

expect <<- DONE
    spawn -ignore HUP bash -ilc "python3.6 $d/backend/manage.py runserver" 
    expect -re ".*Quit the server with CONTROL-C.*"
DONE

if [[ "${aoff}" != "0" ]] && [[ "${prod}" != "0" ]]; then
echo -e "${goodc}Checking frontend packages up to date.${noc}"
npm install &>>/log/npm_install.log
echo -e "${goodc}Starting frontent process.${noc}"

expect <<- DONE
    set timeout 120
    spawn -ignore HUP bash -ilc "ng serve &" 
    expect -re ".*webpack: Compiled successfully.*"
DONE
fi

if [[ "${prod}" == "0" ]]; then
echo -e "${goodc}Starting uWSGI.${noc}"
expect <<- DONE
    spawn bash -ilc "sudo uwsgi -T --die-on-term --ini $d/backend/uwsgi.ini" 
    expect -re ".*Operational MODE: preforking.*"
DONE
echo -e "${goodc}Starting grip for API documentation.${noc}"
expect <<- DONE
    spawn bash -ic "grip $d/doc/api.md"
    expect -re ".*Running on .*"
DONE

echo -e "${goodc}Starting Redis for memcaching.${noc}"
sudo redis-server $d/redis.conf &>>$d/log/redis.log & 

echo -e "${goodc}Starting NGINX.${noc}"
sudo nginx &>>$d/log/nginx.log

echo -e "${goodc}Starting Varnish.${noc}"
sudo /usr/sbin/varnishd -f /etc/varnish/default.vcl -s malloc,256m -a :80 &>>$d/log/varnish.log

fi

echo ""
echo -e "${goodc}Database, frontend, and backend started. Server should now be accessible.${noc}"
echo ""


