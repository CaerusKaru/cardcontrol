#!/bin/bash
sleep 5
es=$(git status -uno -C ~/cardcontrol/ | wc -l)
if [[ "$es" == "2" ]]; then
	echo "[$(date +%Y-%m-%d:%H:%M:%S)]: No updates found." > ~/cardcontrol/deploy.log
      	exit 1
fi
~/cardcontrol/stop.sh && git -C ~/cardcontrol/ stash && git -C ~/cardcontrol/ checkout deploy && git -C ~/cardcontrol/ pull origin deploy && ~/cardcontrol/start.sh
echo "[$(date +%Y-%m-%d:%H:%M:%S)]: Attempted to pull." > ~/cardcontrol/deploy.log

