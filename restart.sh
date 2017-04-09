#!/bin/bash
IFS=$'\n\t'

sudo -u ec2-user cd $d

goodc="\033[38;5;10m"
qc="\033[38;5;222m"
badc="\033[38;5;09m"
noc="\033[38;5;15m"
d=$(dirname "$0")

rout=$(sudo -u ec2-user $d/running.sh)

nginxc=$(echo "$rout" | grep "nginx" | wc -l)
uwsgic=$(echo "$rout" | grep "uwsgi" | wc -l)
varnic=$(echo "$rout" | grep "varnish" | wc -l)
djangc=$(echo "$rout" | grep "python" | wc -l)
postgc=$(echo "$rout" | grep "postgres" | wc -l)

if [[ "$nginxc" == "0" ]] || [[ "$uwsgic" == "0" ]] || [[ "$varnic" == "0" ]] || [[ "$djangc" == "0" ]] || [[ "$postgc" == "0" ]]; then
    sudo -u ec2-user $d/stop.sh
    sudo -u ec2-user $d/start.sh -b -p
fi;

