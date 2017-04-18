#!/bin/bash
set -eEuo pipefail
IFS=$'\n\t'

goodc="\033[38;5;10m"
qc="\033[38;5;222m"
badc="\033[38;5;09m"
noc="\033[38;5;15m"
d=$(dirname "$0")

echo -e "${badc}Above Rate Limit Threshold:${noc}"
echo "Num: |   Response:"
for i in {0..99}; do (curl -Is -X GET http://34.193.86.61/api/v1/domain/2/ | head -n1 &) 2>/dev/null; done | sort | uniq -c

echo -e "${goodc}Below Rate Limit Threshold:${noc}"
echo "Num: |   Response:"
for i in {0..99}; do (curl -Is -X GET http://34.193.86.61/api/v1/domain/2/ | head -n1 &) 2>/dev/null; sleep 0.05; done | sort | uniq -c

