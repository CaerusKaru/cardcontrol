#!/bin/bash
d=$(dirname "$0")

cd $d

set -e
sudo npm install
node --max_old_space_size=700 /home/ec2-user/cardcontrol/node_modules/.bin/ng build --prod --verbose --output-path /home/ec2-user/cardcontrol/dist/ 2> /home/ec2-user/cardcontrol/log/ngbuild.log

sudo rm -r /dist/
sudo mv /home/ec2-user/cardcontrol/dist/ /dist
