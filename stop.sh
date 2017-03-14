#!/bin/bash
d=$(dirname $0)
$d/utils/stop_db.sh 2> /dev/null
pids=$(ps auxww | grep -E "angular|runserve" | grep -v grep | awk '{print $2}')
for pid in $pids; do
	echo "Killing PID $pid"
	sudo kill $pid
done;

