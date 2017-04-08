#!/bin/bash
log='/home/ec2-user/cardcontrol/log/deploysh.log'

if [[ ! -w $log ]]; then echo "" > $log; fi

echo "[$(date +%Y-%m-%d:%H:%M:%S)]: Starting deployment." >> $log 

cd /home/ec2-user/cardcontrol

es=$(git remote show origin | grep 'pushes to dev' | grep 'local out of date' | wc -l)

if [[ "$es" -eq "0" ]]; then
        echo "[$(date +%Y-%m-%d:%H:%M:%S)]: No updates found." >> $log
        exit 103
fi

bash /home/ec2-user/cardcontrol/stop.sh 2>> /home/ec2-user/cardcontrol/log/deploysh.log
git stash 2>> /home/ec2-user/cardcontrol/log/deploysh.log
git checkout deploy && git pull origin dev 2>> /home/ec2-user/cardcontrol/log/deploysh.log
bash /home/ec2-user/cardcontrol/start.sh 2>> /home/ec2-user/cardcontrol/log/deploysh.log

echo "[$(date +%Y-%m-%d:%H:%M:%S)]: Attempted to pull." >> $log

