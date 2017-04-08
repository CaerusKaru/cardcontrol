#!/bin/bash

set -eEuo pipefail
IFS=$'\n\t'

goodc="\033[38;5;10m"
qc="\033[38;5;222m"
badc="\033[38;5;09m"
noc="\033[38;5;15m"
d=$(dirname "$0")

echo -e "${goodc}Stopping database.${noc}"
$d/utils/stop_db.sh 2> /dev/null
echo -e "${goodc}Gathering PIDs for Angular and Django.${noc}"
set +e
hash redis-cli &>/dev/null && redis-cli -s /tmp/redis.sock shutdown
ang="angular|"
set +u
if [[ "$1" == "-a" ]]; then
	ang=""
fi;
pids=$(ps auxww | grep -E "${ang}runserve|nginx|redis|varnish|uwsgi|postgres|psql|pgsql|grip" | grep -v grep | awk '{print $2}' | sort | uniq)
set -e
echo -e "${goodc}Killing PIDs:${noc}"
for pid in $pids; do
	echo "Killing PID $pid"
	set +e 
	sudo kill $pid
	set -e
done;

