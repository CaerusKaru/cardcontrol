#Postgres Install Instructions:

###Note:
This assummes that postgres was installed previously. See the instructions for installing our stack if any questions remain.

###Initial Setup:
First, find your postgres installation directory. If the command for opening the postgres CLI is `psql`, then this can be done with

`ls -al $(which psql)`

This will also show any symbolic links. If there are any, then treat that as the postgres installation directory. 

For the sake of this tutorial, we will assume that postgres is installed at `/usr/local/pgsql/bin/psql`. If you have a different directory and want to ensure that everything is set up as it should be, you can simply make a symbolic link. For example, if postgres is installed at `/opt/postgresql/pg96` you can run `sudo ln -s opt/postgresql/pg96 /usr/local/pgsql` and will be able to copy and paste commands exactly from this tutorial.

Now that we know where it is, navigate to the install directory. List the files and directories with `ls -al`. Ensure that there is a `data` folder owned by the user `postgres`, and that there is a `logs` directory also owned by the user `postgres`. Permissions on these folders should be `700`. If this is not the case, run:

~~~~
sudo adduser postgres
sudo mkdir /usr/local/pgsql/data
sudo mkdir /usr/local/pgsql/data
sudo chown postgres /usr/local/pgsql/data
sudo chown postgres /usr/local/pgsql/logs
sudo chmod 700 /usr/local/pgsql/data
sudo chmod 700 /usr/local/pgsql/logs
~~~~

Note: `sudo` may not be necessary for all steps, depending on the setup in question.

Now, postgres should be set up. To start the database, we must assume the identity of the `postgres` user and start the database process. To do this, run:

`sudo su - postgres`

This will launch a new shell under the postgres identity. Now run:

~~~~
/usr/local/pgsql/bin/initdb -D /usr/local/pgsql/data
/usr/local/pgsql/bin/postmaster -D /usr/local/pgsql/data >/usr/local/pgsql/logs/logfile 2>&1 &
~~~~

You should now have a database process running. Check with `ps auxww | grep 'post'`. 

We can create a database to test with by running:
`/usr/local/pgsql/bin/createdb test`

And can examine the database by running:
`/usr/local/pgsql/bin/psql -d test`

Within the psql CLI, the most useful commands are:
* `\q` : quit
* `\?` : list all commands
* `\c {database}` : switch to a given database
* `\l` : list existing databases
* `\dt` : list tables
* `\du` : list user accounts within postgres
* `SELECT * FROM {table};` : print a table's contents
* `DROP TABLE "{table}";` : delete a table
* `CREATE TABLE "{table};"` : create a table
* `DROP DATABASE "{database}";` : delete a database
* `CREATE DATABASE "{database}";` : create a database
* `CREATE USER "{user}" CREATEDB;` create a user role which can create databases
* `DROP USER "{user}";` : delete a user role

###General Tips:

Remeber that in the `CREATE` and `DROP` commands, the user/table/database name should be in quotes, and that every SQL command (every command not beginning with a backslash) should end with a semicolon.

You will need to create a non-root user for use with Django. Remember to create it with the `CREATEDB` option, as Django requires this.

