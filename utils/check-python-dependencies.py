#!/usr/local/bin/python3.6
import pip

expected = ["python-mimeparse", "setuptools", "six", "python-dateutil", "psycopg2", "pip", "lxml", "Django", "django-tastypie", "defusedxml", "django-cors-headers"]
versions = {"virtualenv": "15.1.0", "six": "1.10.0", "setuptools": "28.8.0", "python-mimeparse": "1.6.0", "python-dateutil": "2.6.0", "psycopg2": "2.7", "pip": "9.0.1", "lxml": "3.7.3", "Django": "1.10.5", "django-tastypie": "0.13.3", "defusedxml": "0.5.0", "django-cors-headers": "2.0.2", "gnureadline": "6.3.3"}

goodc = "\033[38;5;10m"
qc = "\033[38;5;222m"
badc = "\033[38;5;09m"


def install(package):
    pip.main(['install', package])

actual_raw = []
for i in pip.get_installed_distributions(local_only=True):
    actual_raw.append(i)

actual_packages = []
actual_versions = {}
for i in actual_raw:
    pkg, ver = str(i).split(' ')
    actual_packages.append(pkg)
    actual_versions[pkg] = ver

for i in actual_packages:
    if i not in expected:
        print(qc + "Found unexpected package " + i)
    elif actual_versions[i] != versions[i]:
        print(badc + "Found expected package " + i + " but found version " + actual_versions[i] + " when version " + versions[i] + " was expected.")

for i in expected:
    if i not in actual_packages:
        print(badc + "Did not find expected package " + i + ". Please install " + i + " version " + versions[i] + ".")

for i in expected:
    if i not in actual_packages:
        print()
        print(qc + "Would you like to install package " + i + goodc + "? (y/n)")
        ans = input()
        if ans.startswith('y') or ans.startswith('Y'):
            install(i)
