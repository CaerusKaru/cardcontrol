#!/bin/bash

set -eEuo pipefail
IFS=$'\n\t'

goodc="\033[38;5;10m"
qc="\033[38;5;222m"
badc="\033[38;5;09m"
noc="\033[38;5;15m"
d=$(dirname "$0")

cd /usr/local/bin
sudo -u postgres /usr/local/pgsql/bin/pg_ctl -w -D /usr/local/pgsql/data/ -l /usr/local/pgsql/logs/logfile start

