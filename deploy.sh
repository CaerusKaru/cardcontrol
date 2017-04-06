#!/bin/bash
sleep 5
es=$(git status -uno -C ~/cardcontrol/ | wc -l)
if [[ "$es" == "2" ]]; then
	exit 0;
fi;
~/cardcontrol/stop.sh && git -C ~/cardcontrol/ stash && git -C ~/cardcontrol/ checkout deploy && git -C ~/cardcontrol/ pull origin deploy && ~/cardcontrol/start.sh

