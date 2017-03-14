#!/bin/bash

set -eEuo pipefail
IFS=$'\n\t'

goodc="\033[38;5;10m"
qc="\033[38;5;222m"
badc="\033[38;5;09m"
noc="\033[38;5;15m"
d=$(dirname "$0")

echo -e "${goodc}Deleting databases.${noc}"
psql -d postgres -U postgres < $d/bobby_tables.sql
echo -e "${goodc}Creating databases.${noc}"
psql -d postgres -U postgres < $d/create_db.sql

