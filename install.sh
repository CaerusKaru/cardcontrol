#!/bin/bash
goodc="\033[38;5;10m"
qc="\033[38;5;222m"
badc="\033[38;5;09m"
noc="\033[38;5;15m"

d=$(dirname "$0")
pathchanged=0

${d}/utils/env-check.sh 1> /dev/null 2>/dev/null
es="$?"

echo ""
echo -e "${goodc}===============================================================================${noc}"
echo ""

if [[ $es -eq 1 ]]; then
	echo -e "${qc}What is your prefered package manager on this system? ${goodc}[Allowed: apt-get, dnf, yum]${noc}"
	read pmg
	
	if [[ "$pmg" != "apt-get" ]] && [[ "$pmg" != "dnf" ]] && [[ "$pmg" != "yum" ]]; then
		echo -e "${badc}Package manager ${pmg} not supported. Please use either dnf, yum, or apt-get. ${noc}"
		exit 1
	fi;
fi;

echo -e "${goodc}Fetching username.${noc}"
user=$(id | sed 's/[^(]*(//' | sed 's/).*//')

echo -e "${goodc}Checking expected library directory.${noc}"
libdir=${1:-"/home/${user}/comp120-libraries"}
#"
if [[ ! -d "$libdir" ]]; then
	echo -e "${qc}Program will create directory ${libdir}, is this okay? ${goodc}(y/n)${noc}"
	read yn
	if [[ "$yn" =~ [yY].* ]]; then
		mkdir $libdir
	else
		echo -e "${badc}Cannot continue without creating ${libdir}. Please modify this script if you would like to use a different directory.${noc}"
		exit 1
	fi;
fi;

echo -e "${goodc}Checking global package dependecies satisfied.${noc}"
if [[ $es -eq 1 ]]; then
	echo -e "${goodc}Attempting to install tar${noc}"
	sudo ${pmg} install tar
	
	echo -e "${goodc}Attempting to install wget${noc}"
	sudo ${pmg} install wget
	
	echo -e "${goodc}Attempting to install rpm${noc}"
	sudo ${pmg} install rpm 2>/dev/null
	sudo ${pmg} install rpm-common 2>/dev/null
	sudo ${pmg} install rpm-dbg 2>/dev/null
	sudo ${pmg} install librpm-dev 2>/dev/null
	sudo ${pmg} install librpm-devel 2>/dev/null
	sudo rpm -v --rebuilddb --define="_rpmlock_path /var/lock/rpm"
	
	echo -e "${goodc}Attempting to install uuid${noc}"
	sudo ${pmg} install uuid
	sudo ${pmg} install uuid-dev 2>/dev/null
	sudo ${pmg} install uuid-devel 2>/dev/null

	echo -e "${goodc}Attempting to install expect${noc}"
	sudo ${pmg} install expect
	
	echo -e "${goodc}Attempting to install openssl${noc}"
	sudo ${pmg} install openssl 1>/dev/null
	sudo ${pmg} install libssl-dev 2>/dev/null
	sudo ${pmg} install libssl-devel 2>/dev/null
fi;

echo -e "${goodc}Checking that /usr/local/bin is in the front of PATH.${noc}"
fpath=$(echo -e "$PATH" | sed 's/:.*//')
if [[ $fpath != '/usr/local/bin' ]]; then
	echo -e "${goodc}Updating .bashrc to export new path.${noc}"
	echo -e 'export PATH="/usr/local/bin:$PATH"' >> /home/$user/.bashrc
	export PATH="/usr/local/bin:$PATH"
	pathchanged=1
fi;

echo -e "${goodc}Checking correct version of Node is installed.${noc}"
nodev=$(node -v 2>/dev/null)
if [[ "$nodev" != "v7.7.0" ]]; then
	echo -e "${qc}Installing Node & NPM. Press any key to continue.${noc}"
	read trash

	if [[ ! -f "${libdir}/node-v7.7.0-linux-x64.tar.gz" && ! -d "${libdir}/node-v7.7.0-linux-x64" ]]; then
		echo -e "${goodc}Downloading Node JS v7.7.0 from https://nodejs.org/download/release/v7.7.0/node-v7.7.0-linux-x64.tar.gz${noc}"
		wget --directory-prefix=${libdir} -q -c https://nodejs.org/download/release/v7.7.0/node-v7.7.0-linux-x64.tar.gz
	fi;
	
	if [[ ! -d "${libdir}/node-v7.7.0-linux-x64" ]]; then
		tar -xvf ${libdir}/node-v7.7.0-linux-x64.tar.gz --directory ${libdir}
		rm ${libdir}/node-v7.7.0-linux-x64.tar.gz
	fi;
	
	sudo rm /usr/local/bin/node
	sudo rm /usr/local/bin/npm
	sudo ln -s ${libdir}/node-v7.7.0-linux-x64/bin/node /usr/local/bin/node
	sudo ln -s ${libdir}/node-v7.7.0-linux-x64/bin/npm /usr/local/bin/npm

	cd "$d"
	npm install -g @angular/cli
	npm install
	cd -

	sudo ln -s ${libdir}/node-v7.7.0-linux-x64/bin/ng /usr/local/bin/ng

fi;

echo -e "${goodc}Checking correct version of PostgreSQL is installed.${noc}"
psqlv=$(psql -V 2>/dev/null)
if [[ "$psqlv" != "psql (PostgreSQL) 9.6.2" || "$(which psql)" != "/usr/local/bin/psql" ]]; then
	echo -e "${qc}Installing PostgreSQL. Press any key to continue.${noc}"
	read trash

	wget --directory-prefix=${libdir} -q -c ftp://mirror.switch.ch/pool/4/mirror/fedora/linux/releases/25/Server/x86_64/os/Packages/u/uuid-1.6.2-34.fc25.x86_64.rpm
	sudo rpm -Uihv --reinstall --nodeps ${libdir}/uuid-1.6.2-34.fc25.x86_64.rpm
	rm ${libdir}/uuid-1.6.2-34.fc25.x86_64.rpm	
	
	if [[ ! -f "${libdir}/postgresql-9.6.2-1-x64-bigsql.rpm" ]] && [[ ! -d "/opt/postgresql/pg96" ]]; then
		echo -e "${goodc}Downloading PostgresQL 9.6.1 from http://oscg-downloads.s3.amazonaws.com/packages/postgresql-9.6.2-1-x64-bigsql.rpm${noc}"
		wget --directory-prefix=${libdir} -q -c "http://oscg-downloads.s3.amazonaws.com/packages/postgresql-9.6.2-1-x64-bigsql.rpm"
	fi;
	
	sudo rpm -Uihv --nodeps ${libdir}/postgresql-9.6.2-1-x64-bigsql.rpm
	rm ${libdir}/postgresql-9.6.2-1-x64-bigsql.rpm

	sudo rm /usr/local/pgsql
	sudo rm /usr/local/bin/psql
	sudo ln -s /opt/postgresql/pg96 /usr/local/pgsql
	sudo ln -s /opt/postgresql/pg96/bin/psql /usr/local/bin/psql
	
	sudo deluser postgres 2>/dev/null
	sudo userdel postgres 2>/dev/null
	sudo adduser postgres
	sudo rm -r /usr/local/pgsql/data
	sudo rm -r /usr/local/pgsql/logs
	sudo mkdir /usr/local/pgsql/data
	sudo mkdir /usr/local/pgsql/logs
	sudo chown postgres /usr/local/pgsql/data
	sudo chown postgres /usr/local/pgsql/logs
	sudo chmod 700 /usr/local/pgsql/data
	sudo chmod 700 /usr/local/pgsql/logs

	sudo -u postgres /usr/local/pgsql/bin/initdb -D /usr/local/pgsql/data

fi;

echo -e "${goodc}Checking correct version of Python is installed.${noc}"
pyv=$(python3.6 -V 2>/dev/null)
#pyv="aaa"
if [[ "$pyv" != "Python 3.6.0" ]]; then
	echo -e "${qc}Installing Python 3.6.0. Press any key to continue.${noc}"
	read trash

	if [[ ! -f "${libdir}/Python-3.6.0.tgz" && ! -d "${libdir}/Python-3.6.0" ]]; then
		echo -e "${goodc}Downloading Python 3.6.0 from https://www.python.org/ftp/python/3.6.0/Python-3.6.0.tgz${noc}"
		wget --directory-prefix=${libdir} -q -c https://www.python.org/ftp/python/3.6.0/Python-3.6.0.tgz
	fi;
	
	if [[ ! -d "${libdir}/Python-3.6.0" ]]; then
		tar -xvf ${libdir}/Python-3.6.0.tgz --directory ${libdir}
		rm ${libdir}/Python-3.6.0.tgz
	fi;
	
	cd ${libdir}/Python-3.6.0
	${libdir}/Python-3.6.0/configure --with-ssl
	cd -
	make -C ${libdir}/Python-3.6.0
	sudo make -C ${libdir}/Python-3.6.0 install

	sudo rm /usr/local/bin/python3.6
	sudo ln -s ${libdir}/Python-3.6.0/python /usr/local/bin/python3.6

	echo -e "${qc}Would you like the executable 'python3' to start Python 3.6? ${goodc}(y/n)${noc}"
	read yn
	if [[ "$yn" =~ [yY].* ]]; then
		sudo rm /usr/local/bin/python3
		sudo ln -s ${libdir}/Python-3.6.0/python /usr/local/bin/python3
	fi;

	echo -e "${qc}Would you like the executable 'python' to start Python 3.6? ${goodc}(y/n)${noc}"
	read yn
	if [[ "$yn" =~ [yY].* ]]; then
		sudo rm /usr/local/bin/python
		sudo ln -s ${libdir}/Python-3.6.0/python /usr/local/bin/python
	fi;	
fi;

echo -e "${goodc}Checking correct version of Django is installed.${noc}"
djv=$(python3.6 -c "import django; print(django.get_version())" 2>/dev/null)
if [[ "$djv" != "1.10.5" ]]; then
	echo -e "${qc}Installing Django. Press any key to continue.${noc}"
	read trash
	echo -e "${goodc}Attempting to install Django in Python 3.6.0${noc}"
	
	sudo /usr/local/bin/python3.6 -m pip install -I Django==1.10.5
fi;

echo -e "${goodc}Checking Python dependencies are installed.${noc}"
sudo /usr/local/bin/python3.6 ${d}/utils/check-python-dependencies.py

echo ""
echo -e "${goodc}===============================================================================${noc}"
echo ""
echo -e "${goodc}Clearing databases and creating database user roles.${noc}"
echo -e "${goodc}Stopping database.${noc}"
${d}/utils/stop_db.sh
echo -e "${goodc}Starting database.${noc}"
${d}/utils/start_db.sh
echo -e "${goodc}Emptying database contents.${noc}"
psql -d postgres -U postgres < $d/utils/bobby_tables.sql
$d/utils/init_db.sh
echo ""

echo -e "${goodc}===============================================================================${noc}"
echo ""

${d}/utils/env-check.sh

if [[ $pathchanged -eq 1 ]]; then
	echo ""
	echo -e "${qc}NOTE: PATH was changed. Please run ${goodc}source ~/.bashrc ${noc}"
fi

echo ""
echo -e "${goodc}===============================================================================${noc}"
echo ""
echo -e "${goodc}Finished successfully.${noc}"
echo ""
