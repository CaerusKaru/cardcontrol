# Welcome!

Hello! Welcome to CardControl. This is an access control system intended for use as part of a suite of campus services web applications. The application is being developed as a semester project for COMP-120: Web Engineering. 

## Our Stack

We are running a Django backend around a PostgreSQL database, interacting with and serving a RESTful API for a frontend web service written in Angular 2. Our live development server, running in AWS, can be found here [http://34.193.86.61/]. We are serving our static angular content with NGINX, caching HTTP responses with Varnish, and memcaching API responses with a Redis cache behind Varnish. Our RESTful API was created with the help of the Tastypie library for Django. In production, we are serving our Django server through uWSGI.1


## Dependencies

The frontend of this project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-beta.32.3. We have now migrated to 1.0.0 as it has since been released.

The required versions of the major components of our project are:

| Framework/Service      | Version   |
|:-----------------------|:----------|
| node                   | 7.7.0     |
| npm                    | 4.4.4     |
| @angular/cli           | 1.0.0     |
| postgres               | 9.6.2     |
| python                 | 3.6.0     |
| pip                    | 9.0.1     |
| Django                 | 1.10.5    |
| nginx                  | 1.10.2    |
| uwsgi                  | 2.0.14    |
| varnish                | 4.0.4     |
| redis-cli              | 3.2.3     |

Angular packages should be up to date with the defaults for @angular/cli. That is, versions connected to the Angular CLI should be:

| Package                             | Version        |
|:------------------------------------|:---------------|
| @angular/common                     |   4.0.1        |
| @angular/compiler                   |   4.0.1        |
| @angular/core                       |   4.0.1        |
| @angular/animations                 |   4.0.1        |
| @angular/flex-layout                |   2.0.0-beta.7 |
| @angular/forms                      |   4.0.1        |
| @angular/http                       |   4.0.1        |
| @angular/material                   |   2.0.0-beta.3 |
| @angular/router                     |   3.4.10       |
| @angular/compiler-cli               |   4.0.1        |

We use the Angular CLI to start the frontend server, and use additional packages for flex layout and material design.


The servers should be run from 64-bit linux hosts. Our production distribution is RHEL 7.2.

Required python packages are as follows:

| Package              | Version    |
|:---------------------|:-----------|
| python-mimeparse     | 1.6.0      |
| setuptools           | 28.8.0     |
| six                  | 1.10.0     |
| python-dateutil      | 2.6.0      |
| psycopg2             | 2.7        |
| lxml                 | 3.7.3      |
| django-tastypie      | 0.13.3     |
| defusedxml           | 0.5.0      |
| django-cors-headers  | 2.0.2      |
| requests             | 2.13.0     |
| ipaddress            | 1.0.18     |
| django-cachalot      | 1.4.1      |
| redis                | 2.10.5     |
| django-redis         | 4.7.0      |
| django-redis-cache   | 1.7.1      |
| grip                 | 4.3.2      |

We use Tastypie to generate a RESTful API for Django which can be referenced by our Angular frontend. Tastypie requires the XML packages lxml and defusedxml to serve XML data as a response. We use the Django-CORS-headers package to configure CORS requests between our frontend and backend servers in development. The package psycopg2 is used to link PostgreSQL to Django. Redis and related caching packages are used to cache API responses in memory, as a second layer after Varnish.

# Documentation
Documentation for the various frameworks, packages, and components discussed above can be found at the following locations:

| Framework/Service | Package                            | Documentation 
|:------------------|:-----------------------------------|:--------------
| Node              | node                               | https://nodejs.org/docs/v7.7.0/api/
| NPM               | npm                                | https://docs.npmjs.com/
| PostgreSQL        | postgres9.6                        | https://www.postgresql.org/docs/9.6/static/
| NGINX             | nginx                              | https://nginx.org/en/docs/
| uWSGI             | uwsgi                              | https://uwsgi-docs.readthedocs.io/en/latest/
| Varnish           | varnish                            | https://www.varnish-cache.org/docs/5.1/
| Redis             | redis-cli                          | https://redis.io/documentation
| Python            | python3.6                          | https://docs.python.org/3.6/
| Python            | setuptools                         | https://setuptools.readthedocs.io/en/latest/
| Python            | pip                                | https://pip.pypa.io/en/stable/
| Python            | grip                               | https://github.com/joeyespo/grip
| Django            | Django                             | https://docs.djangoproject.com/en/1.10/
| Django            | six                                | https://pythonhosted.org/six/
| Django            | python-mimeparse                   | https://pypi.python.org/pypi/python-mimeparse
| Django            | python-dateutil                    | https://dateutil.readthedocs.io/en/stable/
| Django            | psycopg2                           | https://initd.org/psycopg/docs/
| Django            | django-cors-headers                | https://pypi.python.org/pypi/django-cors-headers/2.0.1
| Django            | django-tastypie                    | https://django-tastypie.readthedocs.io/en/latest/
| Django            | lxml                               | https://lxml.de/3.7/lxmldoc-3.7.2.pdf
| Django            | defusedxml                         | https://pypi.python.org/pypi/defusedxml/
| Django            | requests                           | https://docs.python-requests.org/en/master/
| Django            | ipaddress                          | https://docs.python.org/3/library/ipaddress.html
| Django            | redis                              | https://github.com/andymccurdy/redis-py
| Django            | django-redis                       | http://niwinz.github.io/django-redis/latest/
| Django            | django-redis-cache                 | http://django-redis-cache.readthedocs.io/en/latest/
| Django            | django-cachalot                    | http://django-cachalot.readthedocs.io/en/latest/quickstart.html
| Angular           | @angular/cli                       | https://github.com/angular/angular-cli/wiki
| Angular           | @angular/core                      | https://angular.io/docs/ts/latest/
| Angular           | @angular/flex-layout               | https://github.com/angular/flex-layout/wiki/API-Documentation
| Angular           | @angular/forms                     | https://angular.io/docs/ts/latest/api/#!?query=forms
| Angular           | @angular/http                      | https://angular.io/docs/ts/latest/api/#!?query=http
| Angular           | @angular/material                  | https://material.angular.io/components
| Angular           | @angular/router                    | https://angular.io/docs/ts/latest/guide/router.html

## Installation
Run the script `./install.sh` to create a clean and complete installation of our environment. This has been tested on Fedora 25, Debian 8, and RHEL 7.2 and works out-of-the-box to install everything needed. Please file any issues encountered as GitHub issues, and they will be addressed.

In general, in the package listings above, things in the framework/services category should be installed with your system's package manager (`apt-get`, `yum`, `dnf`, `pacman`, etc.), those which are listed as angular modules should be installed with `npm install` and those which are listed as python packages should be installed with `pip install`.

## Development Server
Simply run the script `./start.sh` to initialize the database, frontend, and backend. Run `./start.sh a` to initialize everything except for our Angular frontend — this is useful for debugging backend API calls without the overhead of starting up the Angular server. 

To initialize the various components separately:

#### Package versioning:
Run `./utils/env-check.sh` to check the versions of various packages are up to date.

#### Stopping running instances:
Run `./stop.sh` to halt any running Angular, Django, PostgreSQL, NGINX, and uWSGI processes.

#### Starting database:
Run `./utils/start_db.sh` to initialize PostgreSQL.

#### Make Django Migrations:
Run `./backend/migrate.sh` to make the Django migrations which create the relevant tables in the database for our project.

#### Populate Database with Test Data:
Run `psql -d postgres -U postgres < ./utils/recreate_database.sql` to fill the database with some test values.

#### Reload Django Counters with Test Data:
Django expects that all primary keys are created by it, but we've added some to the database manually. To have Django reset its sequence counters by finding the maximum ID in the primary key column for each table and incrementing from there, run the following:
```
sql_c=$(python3.6 ./backend/manage.py sqlsequencereset cardcontrol)
echo "${sql_c}" | psql -d cardcontrol -U postgres
```

#### Start Django Backend Server
Run `python3.6 $d/backend/manage.py runserver` to initialize Django.

#### Start Angular
`ng serve`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

In the README.md file at the root of your team's private repository, list all packages, APIs, and dependencies that are used --and link to each dependency's developer documentation
