#!/bin/bash
echo "[$(date +%Y-%m-%d:%H:%M:%S)]: Starting deployment." >> /home/ec2-user/cardcontrol/deploy.log

cd /home/ec2-user/cardcontrol

sleep 5

es=$(sudo -u ec2-user git status -uno | wc -l)

if [[ "$es" == "2" ]]; then
        echo "[$(date +%Y-%m-%d:%H:%M:%S)]: No updates found." >> /home/ec2-user/cardcontrol/deploy.log
        exit 1
fi

sudo -u ec2-user bash /home/ec2-user/cardcontrol/stop.sh 2>> /home/ec2-user/cardcontrol/deploy.log
sudo -u ec2-user git stash 2>> /home/ec2-user/cardcontrol/deploy.log
sudo -u ec2-user git checkout deploy && git pull origin deploy 2>> /home/ec2-user/cardcontrol/deploy.log
sudo -u ec2-user bash /home/ec2-user/cardcontrol/start.sh 2>> /home/ec2-user/cardcontrol/deploy.log

echo "[$(date +%Y-%m-%d:%H:%M:%S)]: Attempted to pull." >> /home/ec2-user/cardcontrol/deploy.log


