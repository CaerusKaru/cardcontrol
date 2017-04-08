#!/bin/bash
log='/home/ec2-user/cardcontrol/log/deploysh.log'
branch='dev'

if [[ ! -w $log ]]; then echo "" > $log; fi

echo "[$(date +%Y-%m-%d:%H:%M:%S)]: Starting deployment." >> $log 

cd /home/ec2-user/cardcontrol

es=$(git remote show origin | grep 'pushes to dev' | grep 'local out of date' | wc -l)

if [[ "$es" -eq "0" ]]; then
        echo "[$(date +%Y-%m-%d:%H:%M:%S)]: No updates found." >> $log
        exit 103
fi

bash /home/ec2-user/cardcontrol/stop.sh 2>> $log
git stash 2>> $log
git checkout $branch && git pull origin $branch 2>> $log
bash /home/ec2-user/cardcontrol/start.sh 2>> $log

echo "[$(date +%Y-%m-%d:%H:%M:%S)]: Attempted to pull." >> $log

