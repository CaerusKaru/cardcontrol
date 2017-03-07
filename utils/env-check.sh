#!/bin/bash
goodc="\033[38;5;10m"
badc="\033[38;5;09m"
noc="\033[38;5;15m"

echo -n "NODE:           "
nodev=$(node -v | sed 's/v//')
if [[ "$nodev" == "7.7.0" ]]; then
	echo -ne "$goodc"
else
	echo -ne "$badc"
fi;
echo -e "$nodev${noc}"

echo -n "NPM:            "
npmv=$(npm -v)
if [[ "$npmv" == "4.1.2" ]]; then
	echo -ne "$goodc"
else
	echo -ne "$badc"
fi;
echo -e "$npmv${noc}"

echo -n "NPM ANGULAR:    "
npmav=$(npm view angular version)
if [[ "$npmav" == "1.6.2" ]]; then
	echo -ne "$goodc"
else
	echo -ne "$badc"
fi;
echo -e "$npmav${noc}"

echo -n "ANGULAR CLI:    "
ngv=$(ng -v | grep angular | head -1 | sed 's/@angular\/cli: //')
if [[ "$ngv" == "1.0.0-rc.1" ]]; then
	echo -ne "$goodc"
else
	echo -ne "$badc"
fi;
echo -e "$ngv${noc}"

echo -n "POSTGRESQL:     "
psqlv=$(psql -V | sed 's/psql (PostgreSQL) //')
if [[ "$psqlv" == "9.6.2" ]]; then
	echo -ne "$goodc"
else
	echo -ne "$badc"
fi;
echo -e "$psqlv${noc}"

echo -n "PYTHON 3:       "
py3v=$(python3 -V | sed 's/Python //')
if [[ "$py3v" == "3.6.0" ]]; then
	echo -ne "$goodc"
else
	echo -ne "$badc"
fi;
echo -e "$py3v${noc}"

echo -n "PIP3:           "
pip3v=$(pip3 -V | sed 's/ from.*//' | sed 's/pip //')
if [[ "$pip3v" == "9.0.1" ]]; then
	echo -ne "$goodc"
else
	echo -ne "$badc"
fi;
echo -e "$pip3v${noc}"

echo -n "DJANGO:         "
djv=$(python3 -c "import django; print(django.get_version())")
if [[ "$djv" == "1.10.5" ]]; then
	echo -ne "$goodc"
else
	echo -ne "$badc"
fi;
echo -e "$djv${noc}"
