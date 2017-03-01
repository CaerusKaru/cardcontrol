#Stack Install instructions:

###Note:
This assumes an environment running on an x86_64 distribution of Linux. Matt is running on Fedora 25.

##Initial Setup:
Ensure your default shell is bash. You can check with:

`echo "$0"`

Ensure your $PATH variable contains the directory `/usr/local/bin` in a prominent place. Check with:

`echo "$PATH"`

If it is not there, or is towards the end, run the following:
`vim ~/.bashrc`

and add the lines:

`PATH=/usr/local/bin:$PATH`

`export PATH`

For the sake of this tutorial we will be storing our libraries in `/home/[USER]/libraries/`.
In reality, store them wherever you want.

##Debugging Tips:

Check the versions for the following with the script in the `utils` directory of our project. Otherwise, look at the man pages to see the versions of the approprate components; usually the flag is `-v`, `--version`, or `-V`.

If you accidentally misuse `ln` and make the wrong link, you can remove it with `rm`.

If you are ever denied permission to some action, just re-run with `sudo`.

##node 7.7.0
Fetch the latest version of node from <https://nodejs.org/en/download/releases/>.
Download the `node-v7.7.0-linux-x64.tar.gz` file.

Unzip with `tar -xvf node-v7.7.0-linux-x64.tar.gz`.

Move the files to `/home/[USER]/libraries/node-v7.7.0-linux-x64/` as follows:

`mv ./node-v7.7.0-linux-x64 /home/[USER]/libraries/`

Link the binaries to somewhere in your path by executing

`sudo ln -s /home/[USER]/libraries/node-v7.7.0-linux-x64/bin/node /usr/local/bin/node`

`sudo ln -s /home/[USER]/libraries/node-v7.7.0-linux-x64/bin/npm /usr/local/bin/npm`

The command to test node is:
`node`

##npm 4.1.2
`npm` should come packaged with `node`, and after the above steps it should be at the appropriate version.
The command to test npm is:
`npm`

##ng 1.0.0-rc.0
Once `npm` is installed, run (possibly as root):
`npm -g install @angular/cli`

The command to test `ng` is:
`ng`

##postgresql 9.6.2
Download the installer from <https://www.bigsql.org/postgresql/installers.jsp>. DEB if on Debian/Ubuntu or RPM if on Fedora/RedHat.
For an rpm:

`sudo rpm -U postgresql-9.6.2-1-x64-bigsql.rpm`

should install the package. If it complains about a missing dependancy `uuid-1.6.2-34.fc25`, the binary can be downloaded from <http://rpm.pbone.net/index.php3/stat/4/idpl/34793061/dir/fedora_other/com/uuid-1.6.2-34.fc25.x86_64.rpm.html>.
and installed with:

`sudo rpm -U uuid-1.6.2-34.fc25.src.rpm`

For a deb:

`sudo dpkg -i postgresql-9.6.2-1-x64-bigsql.deb`

`sudo apt-get install postgresql-9.6.2-1-x64-bigsql.deb`

should do the trick. The second line may not be necessary if running on Debian instead of Ubuntu, depending on your versions.

The command to test postgresql is:
`psql`

##python3 3.6.0
This one is a pain to do correctly. 
Download the release from <https://www.python.org/downloads/>.
Unzip the file `Python-3.6.0.tar.xz` with:

`tar -xvf Python-3.6.0.tar.xz`

Move the files to `/home/[USER]/libraries/Python-3.6.0` with:

`mv ./Python-3.6.0 /home/[USER]/libraries/Python-3.6.0`

go to that directory and run:

`./configure --with-ssl`

`make`

`sudo make install`

Hope for the best. If it installs and you have a python binary in the folder now, run `./python -V` to check the version is correct. Then
link the binaries to somewhere in your path by executing your preference from the following:

`sudo ln -s /home/[USER]/libraries/Python-3.6.0/python /usr/local/bin/python`

`sudo ln -s /home/[USER]/libraries/Python-3.6.0/python /usr/local/bin/python3`

`sudo ln -s /home/[USER]/libraries/Python-3.6.0/python /usr/local/bin/python3.6`

You can also do all three if you prefer; different programs have different conventions. These are just symbolic links, so they don't change anything drastic in your system.

##pip3 9.0.1
After installing python, you can try to just execute `pip`, `pip3`, and `pip3.6` to see what works. `pip -V` is the flag to see the version and Python version on which it relies. You can also just `cat` the pip file --- the pip binary in the bin folder is really just a tiny python script, and you can see what Python version it is running from the script.

##Django 1.10.5
Once pip is installed and functioning with Python 3.6, run:

`sudo pip3 install Django`

to attempt to install Django. If you're not sure about whether pip is using Python 3.6.0, you can install it explicitly with:

`python3 -m pip install Django`

assmuing python3 links to Python 3.6.0

You can run `python3 -c "import django; print(django.get_version())"` to check that Django is all in order version-wise.

If pip complains that it cannot connect due to an SSL error, double-check that you have openssl installed (it should exist by default on most systems) and configured python for its install with `./configure --with-ssl`.

# Once the Above Are Installed:

Run the script in the `utils` folder of our project with `bash`, and marvel at how correct your versions are.
