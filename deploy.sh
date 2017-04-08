#!/bin/bash
set -e
log='/home/ec2-user/cardcontrol/log/deploysh.log'
branch='dev'
echo "Deployment Script."
if [[ ! -w $log ]]; then echo "" > $log; fi

echo "[$(date +%Y-%m-%d:%H:%M:%S)]: Starting deployment." >> $log 

cd /home/ec2-user/cardcontrol

es=$(git remote show origin | grep 'pushes to dev' | grep 'local out of date' | wc -l)

if [[ "$es" -eq "0" ]]; then
        echo "[$(date +%Y-%m-%d:%H:%M:%S)]: No updates found." >> $log
        exit 103
fi

bash /home/ec2-user/cardcontrol/start.sh 2>> $log
echo "[$(date +%Y-%m-%d:%H:%M:%S)]: Stopping server." >> $log
sudo bash /home/ec2-user/cardcontrol/stop.sh &>> $log
echo "[$(date +%Y-%m-%d:%H:%M:%S)]: Stash modified files." >> $log
git stash &>> $log
echo "[$(date +%Y-%m-%d:%H:%M:%S)]: Checkout $branch and pull from origin." >> $log
set +e
git checkout $branch
set -e
git pull origin $branch &>> $log
echo "[$(date +%Y-%m-%d:%H:%M:%S)]: Start server again." >> $log
sudo bash /home/ec2-user/cardcontrol/start.sh &>> $log

echo "[$(date +%Y-%m-%d:%H:%M:%S)]: Attempted to pull." >> $log

