#!/bin/bash
goodc="\033[38;5;10m"
qc="\033[38;5;198m"
badc="\033[38;5;09m"
noc="\033[38;5;15m"

echo -e "${qc}What is your prefered package manager on this system?${noc}"

read pmg

if [[ "$pmg" != "apt-get" ]] || [[ "$pmg" != "dnf" ]] || [[ "$pmg" != "dnf" ]]; then
	echo -e "Package manager ${pmg} not supported.${noc}"
	exit(1)
fi;

user=$(id | sed 's/[^(]*(//' | sed 's/).*//')
if [[ "$user" == "root" ]]; then
	echo -e "Please do not run this script as root.${noc}"
	exit(1)
fi;

libdir="/home/${user}/comp-120-libraries${noc}"
if [[ ! -d "$libdir" ]]; then
	echo -e "${qc}Program will create directory ${libdir}, is this okay? (y/n)${noc}"
	read yn
	if [[ "$yn" =~ "[yY].*" ]]; then
		mkdir "$libir${noc}"
	else
		echo -e "Exiting.${noc}"
		exit(1)
	fi;
fi;

echo -e "${goodc}Attempting to install tar${noc}"
sudo ${pmg} install tar

echo -e "${goodc}Attempting to install wget${noc}"
sudo ${pmg} install wget

echo -e "${goodc}Attempting to install wget${noc}"
sudo ${pmg} install rpm

echo -e "${goodc}Checking /usr/local/bin is in the front of path.${noc}"
fpath=$(echo -e "$PATH" | sed 's/:.*//')
if [[ $fpath == '/usr/local/bin' ]]; then
	echo -e "${goodc}Updating .bashrc to export new path.${noc}"
	echo -e 'export PATH="/usr/local/bin:$PATH"' >> /home/$user/.bashrc
	source /home/$user/.bashrc
fi;

nodev=$(node -v)
if [[ "$nodev" != "v7.7.0" ]]; then

	if [[ ! -f "${libdir}/node-v7.7.0-linux-x64.tar.gz" && ! -d "${libdir}/node-v7.7.0-linux-x64" ]]; then
		echo -e "${goodc}Downloading Node JS v7.7.0 from https://nodejs.org/download/release/v7.7.0/node-v7.7.0-linux-x64.tar.gz${noc}"
		wget --directory-prefix=${libdir} -q -c https://nodejs.org/download/release/v7.7.0/node-v7.7.0-linux-x64.tar.gz
	fi;
	
	if [[ ! -d "${libdir}/node-v7.7.0-linux-x64" ]]; then
		tar -xvf ${libdir}/node-v7.7.0-linux-x64.tar.gz
	fi;
	
	sudo ln -s ${libdir}/node-v7.7.0-linux-x64/bin/node /usr/local/bin/node
	sudo ln -s ${libdir}/node-v7.7.0-linux-x64/bin/npm /usr/local/bin/npm

fi;

wget --directory-prefix=${libdir} -q -c ftp://mirror.switch.ch/pool/4/mirror/fedora/linux/releases/25/Server/x86_64/os/Packages/u/uuid-1.6.2-34.fc25.x86_64.rpm
sudo rpm -U ${libdir}/uuid-1.6.2-34.fc25.x86_64.rpm

psqlv=$(psqlv -v)
if [[ "$psqlv" != "psql (PostgreSQL) 9.6.2" && "$(which postgres)" != "/usr/local/bin/psql" ]]; then

	if [[ ! -f "${libdir}/postgresql-9.6.2-1-x64-bigsql.rpm" ]]; then
		echo -e "${goodc}Downloading PostgresQL 9.6.1 from https://www.bigsql.org/oscg_download.jsp?file=packages/postgresql-9.6.2-1-x64-bigsql.rpm${noc}"
		wget --directory-prefix=${libdir} -q -c https://www.bigsql.org/oscg_download.jsp?file=packages/postgresql-9.6.2-1-x64-bigsql.rpm
	fi;
	
	sudo rpm -U ${libdir}/postgresql-9.6.2-1-x64-bigsql.rpm

	sudo ln -s opt/postgresql/pg96 /usr/local/pgsql
	sudo ln -s opt/postgresql/pg96/bin/psql /usr/local/bin/psql
	
	sudo adduser postgres
	sudo mkdir /usr/local/pgsql/data
	sudo mkdir /usr/local/pgsql/data
	sudo chown postgres /usr/local/pgsql/data
	sudo chown postgres /usr/local/pgsql/logs
	sudo chmod 700 /usr/local/pgsql/data
	sudo chmod 700 /usr/local/pgsql/logs

	sudo -u postgres /usr/local/pgsql/bin/initdb -D /usr/local/pgsql/data

fi;

pyv=$(python3.6 -V)
if [[ "$pyv" != "Python 3.6.0" ]]; then

	if [[ ! -f "${libdir}/Python-3.6.0.tgz" && ! -d "${libdir}/Python-3.6.0" ]]; then
		echo -e "${goodc}Downloading Python 3.6.0 from https://www.python.org/ftp/python/3.6.0/Python-3.6.0.tgz${noc}"
		wget --directory-prefix=${libdir} -q -c https://www.python.org/ftp/python/3.6.0/Python-3.6.0.tgz
	fi;
	
	if [[ ! -d "${libdir}/node-v7.7.0-linux-x64" ]]; then
		tar -xvf ${libdir}/Python-3.6.0.tgz
	fi;
	

	${libdir}/Python-3.6.0/configure --with-ssl
	make -C ${libdir/Python-3.6.0}
	sudo make -C ${libdir/Python-3.6.0} install

	sudo ln -s ${libdir}/Python-3.6.0/python /usr/local/bin/python3.6

	echo -e "${qc}Would you like the executable 'python3' to start Python 3.6? (y/n)${noc}"
	read yn
	if [[ "$yn" =~ "[yY].*" ]]; then
		sudo ln -s ${libdir}/Python-3.6.0/python /usr/local/bin/python3
	fi;

	echo -e "${qc}Would you like the executable 'python' to start Python 3.6? (y/n)${noc}"
	read yn
	if [[ "$yn" =~ "[yY].*" ]]; then
		sudo ln -s ${libdir}/Python-3.6.0/python /usr/local/bin/python
	fi;	

fi;

echo -e "${goodc}Attempting to install Django in Python 3.6.0${noc}"

python3.6 -m pip install Django

echo -e "${goodc} Finished successfully.${noc}"



