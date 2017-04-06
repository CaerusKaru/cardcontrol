#!/bin/bash
echo "[$(date +%Y-%m-%d:%H:%M:%S)]: Starting deployment." >> /home/ec2-user/cardcontrol/deploy.log

sleep 5

es=$(git status -uno | wc -l)
if [[ "$es" == "2" ]]; then
        echo "[$(date +%Y-%m-%d:%H:%M:%S)]: No updates found." >> /home/ec2-user/cardcontrol/deploy.log
        exit 1
fi
/home/ec2-user/cardcontrol/stop.sh && git stash && git checkout deploy && git pull origin deploy && /home/ec2-user/cardcontrol/start.sh
echo "[$(date +%Y-%m-%d:%H:%M:%S)]: Attempted to pull." >> /home/ec2-user/cardcontrol/deploy.log


