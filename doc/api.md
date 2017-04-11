
# [Introduction](#intro)

Hello! Welcome to the CardControl API. This interface allows you to interact with your ID card directly, submitting critical requests from the comfort of your own environment, or wrapping our service in a more convenient form. The following serves as documentation for our API, and will hopefully guide you well in your access control ventures. 

# [Table of Contents](#table-of-contents)
* [Introduction](#introduction)
* [Table of Contents](#table-of-contents)
* [Notes](#notes)
* [Structure of the API](#structure-of-the-api)
    * [Card](#card)
        * [GET /api/v1/card/`$id`](#get-apiv1cardid)
        * [GET /api/v1/card?utln=`$utln`](#get-apiv1cardutlnutln)
        * [POST /api/v1/card](#post-apiv1card)
    * [Edited Card](#edited-card)
        * [GET /api/v1/edited_card/`$id`](#get-apiv1edited_cardid)
        * [GET /api/v1/edited_card?utln=`$utln`](#get-apiv1edited_cardutlnutln)
        * [POST /api/v1/edited_card](#post-apiv1edited_card)
    * [User Account](#user-account)
        * [GET /api/v1/user_account/`$id`](#get-apiv1user_accountid)
        * [GET /api/v1/user_account?utln=`$utln`](#get-apiv1user_accountutlnutln)
        * [POST /api/v1/user_account](#post-apiv1user_account)
    * [Access Point](#access-point)
        * [GET /api/v1/access_point/`$id`](#get-apiv1access_pointid)
        * [GET /api/v1/access_point?access_point_name=`$access_point_name`](#get-apiv1access_pointaccess_point_nameaccess_point_name)
        * [GET /api/v1/access_point?resource=`$resource`](#get-apiv1access_pointresourceresource)
        * [POST /api/v1/access_point](#post-apiv1access_point)
    * [Resource](#resource)
        * [GET /api/v1/resource/`$id`](#get-apiv1resourceid)
        * [GET /api/v1/resource?resource_name=`$resource_name`](#get-apiv1resourceresource_nameresource_name)
        * [GET /api/v1/resource?city=`$city`](#get-apiv1resourcecitycity)
        * [GET /api/v1/resource?state=`$state`](#get-apiv1resourcestatestate)
        * [GET /api/v1/resource?country=`$country`](#get-apiv1resourcecountrycountry)
        * [GET /api/v1/resource?address=`$address`](#get-apiv1resourceaddressaddress)
        * [GET /api/v1/resource?zipcode=`$zipcode`](#get-apiv1resourcezipcodezipcode)
        * [POST /api/v1/resource](#post-apiv1resource)
    * [Domain](#domain)
        * [GET /api/v1/domain/`$id`](#get-apiv1domainid)
        * [GET /api/v1/domain?domain_name=`$domain_name`](#get-apiv1domaindomain_namedomain_name)
        * [POST /api/v1/domain](#post-apiv1domain)
    * [Request](#request)
        * [GET /api/v1/request/`$id`](#get-apiv1requestid)
        * [GET /api/v1/request/?user=`$user`](#get-apiv1requestuseruser)
        * [GET /api/v1/request/?request_level=`$request_level`](#get-apiv1requestrequest_levelrequest_level)
        * [GET /api/v1/request/?status=`$status`](#get-apiv1requeststatusstatus)
        * [GET /api/v1/request/?modified_at=`$modified_at`](#get-apiv1requestmodified_atmodified_at)
        * [GET /api/v1/request/?created_at=`$created_at`](#get-apiv1requestcreated_atcreated_at)
        * [POST /api/v1/request`](#post-apiv1request)


# [Notes](#notes)

* The current production URL of our service is http://34.193.86.61/. All paths referenced in the following documentation should be appended to that URL.

* Our production URL is subject to change as our still-developing architecture evolves, but the relative paths referenced here are guaranteed for our users.

* Some API requests may require authentication in the future.

# [Structure of the API](#structure-of-the-api)

Our API has a single main endpoint at `/api/` which is a reference to this documentation. This supports only a simple `GET` request, as it is simply documentation for the API to follow.

We maintain a versioning system for the API. For now, there exists an endpoint `/api/v1/` where the CardControl API is running — in the future, we may add other API versions with different support and different interfaces.

The API has six major components. Each supports different operations. They are as follows:

|  Module         | Allowed Methods |
|-----------------|-----------------|
| card            | GET, PUT, POST  |
| user_account    | GET, PUT, POST  |
| access_point    | GET, PUT, POST  |
| resource        | GET, PUT, POST  |
| domain          | GET, PUT, POST  |
| request         | GET, PUT, POST  |

The use and description of each component will be in the following six sections.

The data returned from or sent to a given API endpoint can be either JSON or XML. All fields above *must* be included. To change the format when making a request from the browser, the parameter `?format=json` or `?format=xml` can be appended to any endpoint on any `GET` request to force the API to ignore HTTP headers and return a given format.

In the documentation below, the `$` symbol will be used to denote variable values; for example the string `$utln` will be used to denote the UTLN of a given user, which could be e.g. `jsmith01` or `mredis05`, or the variable `$id` could be the integer `1`, `2`, or `438`. 

We use a system of queries to filter responses by a given attribute. The root path to a component, e.g. `/api/v1/request/` can be followed by the symbol `?` to filter all requests by a set of allowed values documented below.

## [Card](#card)

A card is an object representing the physical ID card each system user holds. It contains all relevant text fields one would find on the card. The relevant methods are as follows:

### [GET /api/v1/card/`$id`](#get-apiv1cardid)

Returns the card with a given `id`. This is not the card ID within the institution, but rather a unique identifier beginning from 1, identifying cards within the CardControl system.

|  Field          | Value Type      | Description                                                      | Example                 |
|-----------------|-----------------|------------------------------------------------------------------|-------------------------|
| utln            | `STRING`        | The UTLN of the card owner.                                      | `jsmith01`                |
| first_name      | `STRING`        | The first name of the card owner.                                | `John`                    |
| middle_initial  | `CHAR`          | The middle initial of the card owner. Must be a single character.| `A`                       |
| last_name       | `STRING`        | The last name of the card owner.                                 | `Smith`                   |
| birth_date      | `DATETIME`      | The bithdate of the card owner.                                  | `1996-04-06`              |
| class_year      | `INT`           | The class year of the card owner. Must be a 4-digit integer.     | `2017`                    |
| school          | `STRING`        | The school within the university to which the card owner belongs.| `Liberal Arts`            |
| student_type    | `STRING`        | The type of community member the card owner is.                  | `Graduate`               |
| jumbocash_id    | `INT`           | The campus money system ID of the card owner.                    | `987654321`               |
| barcode         | `INT`           | The numeric barcode value of the ID.                             | `123456789`               |
| id              | `INT`           | Has value `$id`.                                                   | `1`                       |
| resource_uri    | `STRING`        | Has value '/api/v1/card/$id'.                                    | `/api/v1/card/1`          |

An example JSON object is as follows:

```
{
  "utln": "hkaise01",
  "first_name": "Harrison",
  "middle_initial": "M",
  "last_name": "Kaiser",
  "birth_date": "1996-10-02",
  "class_year": 2019,
  "school": "Liberal Arts",
  "student_type": "Undergraduate",
  "jumbocash_id": 111222333,
  "barcode": 0,
  "id": 1,
  "resource_uri": "/api/v1/card/1/"
}
```

### [GET /api/v1/card?utln=`$utln`](#get-apiv1cardutln)

Returns all available cards in a list format. In JSON, this is an array. The card objects are exactly as above. Users are only allowed access to cards which match their UTLN, and as such this method is only allowed if the user is authenticated and $utln is equal to that user's UTLN.

An example JSON object is as follows:

```
{
  "meta": {
    "limit": 20,
    "next": null,
    "offset": 0,
    "previous": null,
    "total_count": 2
  },
  "objects": [
    {
      "utln": "masnes01",
      "first_name": "Matthew",
      "middle_initial": "D",
      "last_name": "Asnes",
      "birth_date": "1996-08-04",
      "class_year": 2018,
      "school": "Liberal Arts",
      "student_type": "Undergraduate",
      "jumbocash_id": 111222334,
      "barcode": 1000,
      "id": 2,
      "resource_uri": "/api/v1/card/2/"
    },
    {
      "utln": "masnes01",
      "first_name": "Matt",
      "middle_initial": "D",
      "last_name": "Asnes",
      "birth_date": "1996-08-04",
      "class_year": 2018,
      "school": "Liberal Arts",
      "student_type": "Undergraduate",
      "jumbocash_id": 111222334,
      "barcode": 1000,
      "id": 5,
      "resource_uri": "/api/v1/card/6/"
    }
  ]
}
```

### [POST /api/v1/card](#post-apiv1card)

Sends a new card object to be created in the database. This will only work if the UTLN of the user_account sending the request is equal to the card's UTLN, or if the user account in question is a manager.

The object to be send should have the following fields. Any additional fields will be ignored.

|  Field          | Value Type      | Description                                                      | Example                 |
|-----------------|-----------------|------------------------------------------------------------------|-------------------------|
| utln            | `STRING`        | The UTLN of the card owner.                                      | `jsmith01`                |
| first_name      | `STRING`        | The first name of the card owner.                                | `John`                    |
| middle_initial  | `CHAR`          | The middle initial of the card owner. Must be a single character.| `A`                       |
| last_name       | `STRING`        | The last name of the card owner.                                 | `Smith`                   |
| birth_date      | `DATETIME`      | The bithdate of the card owner.                                  | `1996-04-06`              |
| class_year      | `INT`           | The class year of the card owner. Must be a 4-digit integer.     | `2017`                    |
| school          | `STRING`        | The school within the university to which the card owner belongs.| `Liberal Arts`            |
| student_type    | `STRING`        | The type of community member the card owner is.                  | `Graduate`                |
| jumbocash_id    | `INT`           | The campus money system ID of the card owner.                    | `987654321`               |
| barcode         | `INT`           | The numeric barcode value of the ID.                             | `123456789`               |

The header of the HTTP request must match the format of the data being sent, and that format must be either JSON or XML. All fields above *must* be included. 


## [Edited Card](#edited-card)

An edited card is an object representing a modification to a user's card which is suggested by the user. When a user requests some change to their card, an edited card object is created.1 The relevant methods are as follows:

### [GET /api/v1/edited_card/`$id`](#get-apiv1edited_cardid)

Returns the edited card with a given ID. This is not the card ID of the institution, but rather a unique identifier beginning from 1, identifying cards within the CardControl system.

|  Field          | Value Type      | Description                                                      | Example                 |
|-----------------|-----------------|------------------------------------------------------------------|-------------------------|
| utln            | `STRING`        | The UTLN of the card owner.                                      | `jsmith01`                |
| first_name      | `STRING`        | The first name of the card owner.                                | `John`                    |
| middle_initial  | `CHAR`          | The middle initial of the card owner. Must be a single character.| `A`                       |
| last_name       | `STRING`        | The last name of the card owner.                                 | `Smith`                   |
| birth_date      | `DATETIME`      | The bithdate of the card owner.                                  | `1996-04-06`              |
| class_year      | `INT`           | The class year of the card owner. Must be a 4-digit integer.     | `2017`                    |
| school          | `STRING`        | The school within the university to which the card owner belongs.| `Liberal Arts`            |
| student_type    | `STRING`        | The type of community member the card owner is.                  | `Graduate`               |
| jumbocash_id    | `INT`           | The campus money system ID of the card owner.                    | `987654321`               |
| barcode         | `INT`           | The numeric barcode value of the ID.                             | `123456789`               |
| id              | `INT`           | Has value $id.                                                   | `1`                       |
| resource_uri    | `STRING`        | Has value '/api/v1/card/$id'.                                    | `/api/v1/card/1`          |

An example JSON object is as follows:

```
{
  "utln": "hkaise01",
  "first_name": "Harrison",
  "middle_initial": "M",
  "last_name": "Kaiser",
  "birth_date": "1996-10-02",
  "class_year": 2019,
  "school": "Liberal Arts",
  "student_type": "Undergraduate",
  "jumbocash_id": 111222333,
  "barcode": 0,
  "id": 1,
  "resource_uri": "/api/v1/card/1/"
}
```

### [GET /api/v1/edited_card?utln=`$utln`](#get-apiv1edited_cardutln)

Returns all available cards in a list format. In JSON, this is an array. The card objects are exactly as above. Users are only allowed access to cards which match their UTLN, and as such this method is only allowed if the user is authenticated and $utln is equal to that user's UTLN.

An example JSON object is as follows:

```
{
  "meta": {
    "limit": 20,
    "next": null,
    "offset": 0,
    "previous": null,
    "total_count": 2
  },
  "objects": [
    {
      "utln": "masnes01",
      "first_name": "Matthew",
      "middle_initial": "D",
      "last_name": "Asnes",
      "birth_date": "1996-08-04",
      "class_year": 2018,
      "school": "Liberal Arts",
      "student_type": "Undergraduate",
      "jumbocash_id": 111222334,
      "barcode": 1000,
      "id": 2,
      "resource_uri": "/api/v1/card/2/"
    },
    {
      "utln": "masnes01",
      "first_name": "Matt",
      "middle_initial": "D",
      "last_name": "Asnes",
      "birth_date": "1996-08-04",
      "class_year": 2018,
      "school": "Liberal Arts",
      "student_type": "Undergraduate",
      "jumbocash_id": 111222334,
      "barcode": 1000,
      "id": 5,
      "resource_uri": "/api/v1/card/6/"
    }
  ]
}
```

### [POST /api/v1/edited_card](#post-apiv1edited_card)

Sends a new edited card object to be created in the database. This will only work if the UTLN of the user_account sending the request is equal to the card's UTLN, or if the user account in question is a manager.

The object to be send should have the following fields. Any additional fields will be ignored.

|  Field          | Value Type      | Description                                                      | Example                 |
|-----------------|-----------------|------------------------------------------------------------------|-------------------------|
| utln            | `STRING`        | The UTLN of the card owner.                                      | `jsmith01`                |
| first_name      | `STRING`        | The first name of the card owner.                                | `John`                    |
| middle_initial  | `CHAR`          | The middle initial of the card owner. Must be a single character.| `A`                       |
| last_name       | `STRING`        | The last name of the card owner.                                 | `Smith`                   |
| birth_date      | `DATETIME`      | The bithdate of the card owner.                                  | `1996-04-06`              |
| class_year      | `INT`           | The class year of the card owner. Must be a 4-digit integer.     | `2017`                    |
| school          | `STRING`        | The school within the university to which the card owner belongs.| `Liberal Arts`            |
| student_type    | `STRING`        | The type of community member the card owner is.                  | `Graduate`                |
| jumbocash_id    | `INT`           | The campus money system ID of the card owner.                    | `987654321`               |
| barcode         | `INT`           | The numeric barcode value of the ID.                             | `123456789`               |

The header of the HTTP request must match the format of the data being sent, and that format must be either JSON or XML. All fields above *must* be included. 


## [User Account](#user-account)

A user account is the primary means by which users interact with the system. Each user has a user account with a unique UTLN, and this identifies the user across the system. A user account posesses a card, an access level, and a set of resources, domains, and access points to which that user has access. A card is considered 'active' if and only if the user_account with the same UTLN has its card reference set to that card. A manager level is coded as an integer corresponding to how much system control a given user has. Possible values are as follows:

| Level Code    | Manager Level     | Description                               |
|---------------|-------------------|-------------------------------------------|
| 0             | Unpriveleged      | Not a manager; simple user.               |
| 1             | Resource Manager  | Manager of one or more resources.         |
| 2             | System Manager    | Sidewide administrator.                   |

### [GET /api/v1/user_account/`$id`](#get-apiv1user_accountid)

Returns the user account with the given ID. 

|  Field          | Value Type      | Description                                                      | Example                 |
|-----------------|-----------------|------------------------------------------------------------------|-------------------------|
| utln            | `STRING`        | The unqiue UTLN username associated with the user.               | `jsmith01              `  |
| first_name      | `STRING`        | The first name of the user.                                      | `John                  `  |
| last_name       | `STRING`        | The last name of the user.                                       | `Smith                 `  |
| card            | `STRING`        | A reference to the active card of the user.                      | `/api/v1/card/1        `  |
| access_points   | `ACCESS_POINT[]`| An array of access point objects to which this user has access.  | `[ { "id": 1, ...}, ... ]     `  |
| resources_managed | `STRING[]`    | An array of *references* to resources which this user manages.   | `[ /api/v1/resource/1, ... ]  `  |
| manager_level   | `INT`           | The user's manager level code as defined above.                  | `2                     `  |
| id              | `INT`           | Has value $id.                                                   | `1                     `  |
| resource_uri    | `STRING`        | Has value '/api/v1/user_account/$id'.                            | `/api/v1/user_account/1`  |

An example JSON object is as follows:

```
{
{
  "utln": "masnes01",
  "card": "/api/v1/card/2/",
  "first_name": "Matthew",
  "last_name": "Asnes",
  "access_points": [
    {
      "access_point_name": "Metcalf East",
      "created_by": "/api/v1/user_account/1/",
      "id": 1,
      "modified_by": "/api/v1/user_account/1/",
      "parent": "/api/v1/resource/1/",
      "resource_uri": "/api/v1/access_point/1/"
    },
    {
      "access_point_name": "Metcalf West",
      "created_by": "/api/v1/user_account/1/",
      "id": 2,
      "modified_by": "/api/v1/user_account/1/",
      "parent": "/api/v1/resource/1/",
      "resource_uri": "/api/v1/access_point/2/"
    },
    {
      "access_point_name": "Main Entrance",
      "created_by": "/api/v1/user_account/1/",
      "id": 3,
      "modified_by": "/api/v1/user_account/1/",
      "parent": "/api/v1/resource/2/",
      "resource_uri": "/api/v1/access_point/3/"
    },
    {
      "access_point_name": "Main Entrance",
      "created_by": "/api/v1/user_account/1/",
      "id": 5,
      "modified_by": "/api/v1/user_account/1/",
      "parent": "/api/v1/resource/3/",
      "resource_uri": "/api/v1/access_point/5/"
    }
  ],
  "resources_managed": [],
  "manager_level": 2,
  "id": 1,
  "resource_uri": "/api/v1/user_account/1/"
}
}
```

### [GET /api/v1/user_account?utln=`$utln`](#get-apiv1user_accountutlnutln)

Returns an array guaranteed to contain one object, which is the unique user whose UTLN is the string specified. 

An example JSON object is as follows:

```
{
  "meta": {
    "limit": 20,
    "next": null,
    "offset": 0,
    "previous": null,
    "total_count": 1
  },
  "objects": [
    {
      "utln": "masnes01",
      "card": "/api/v1/card/2/",
      "first_name": "Matthew",
      "last_name": "Asnes",
      "access_points": [
        {
          "access_point_name": "Metcalf East",
          "created_by": "/api/v1/user_account/1/",
          "id": 1,
          "modified_by": "/api/v1/user_account/1/",
          "parent": "/api/v1/resource/1/",
          "resource_uri": "/api/v1/access_point/1/"
        },
        {
          "access_point_name": "Metcalf West",
          "created_by": "/api/v1/user_account/1/",
          "id": 2,
          "modified_by": "/api/v1/user_account/1/",
          "parent": "/api/v1/resource/1/",
          "resource_uri": "/api/v1/access_point/2/"
        },
        {
          "access_point_name": "Main Entrance",
          "created_by": "/api/v1/user_account/1/",
          "id": 3,
          "modified_by": "/api/v1/user_account/1/",
          "parent": "/api/v1/resource/2/",
          "resource_uri": "/api/v1/access_point/3/"
        },
        {
          "access_point_name": "Main Entrance",
          "created_by": "/api/v1/user_account/1/",
          "id": 5,
          "modified_by": "/api/v1/user_account/1/",
          "parent": "/api/v1/resource/3/",
          "resource_uri": "/api/v1/access_point/5/"
        }
      ],
      "resources_managed": [],
      "manager_level": 2,
      "id": 1,
      "resource_uri": "/api/v1/user_account/1/"
    }
  ]
}
```

### [POST /api/v1/user_account](#post-apiv1user_account)

Sends a new user_account object to be created in the database. 

The object to be send should have the following fields. Any additional fields will be ignored.

|  Field          | Value Type      | Description                                                      | Example                 |
|-----------------|-----------------|------------------------------------------------------------------|-------------------------|
| utln            | `STRING`        | The unqiue UTLN username associated with the user.               | `jsmith01`                |
| first_name      | `STRING`        | The first name of the user.                                      | `John`                    |
| last_name       | `STRING`        | The last name of the user.                                       | `Smith`                   |
| card            | `STRING`        | A reference to the active card of the user.                      | `/api/v1/card/1 `         |
| access_points   | `ACCESS_POINT[]`| An array of access point objects to which this user has access.  | `[ { "id": 1, ...}, ... ]`       |
| manager_level   | `INT`           | The integer manager level code, as defined above.                | `2`                       |
| resources_managed | `STRING[]`    | An array of *references* to resources which this user manages.   | `[ /api/v1/resource/1, ... ] `   |

The header of the HTTP request must match the format of the data being sent, and that format must be either JSON or XML. All fields above *must* be included. 


## [Access Point](#access-point)

An access point is any single location to which access can be granted or revoked, e.g. a door on campus, or a web application.

### [GET /api/v1/access_point/`$id`](#get-apiv1access_pointid)

Returns the access point with the given ID. 

|  Field          | Value Type      | Description                                                      | Example                 |
|-----------------|-----------------|------------------------------------------------------------------|-------------------------|
| access_point_name | `STRING`      | The name of this access point.                                   | `Halligan Main Entrance`  |
| parent          | `STRING`        | A reference to the resource to which this access point belongs.  | `/api/v1/resource/1    `  |
| created_by      | `STRING`        | A reference to the user who created this access point.           | `/api/v1/user_account/1`  |
| modified_by     | `STRING`        | A reference to the user who last modified this access point.     | `/api/v1/user_account/1`  |
| users           | `STRING[]`      | An array of references to users who have access to this access point. | `[ "/api/v1/user_account/1", ... ]` |
| id              | `INT`           | Has value $id.                                                   | `1                     `  |
| resource_uri    | `STRING`        | Has value '/api/v1/access_point/$id'.                            | `/api/v1/access_point/1`  |

An example JSON object is as follows:

```
{
  "access_point_name": "Metcalf West",
  "created_by": "/api/v1/user_account/1/",
  "id": 2,
  "modified_by": "/api/v1/user_account/1/",
  "parent": "/api/v1/resource/1/",
  "users": [
    "/api/v1/user_account/1/",
    "/api/v1/user_account/2/",
    "/api/v1/user_account/3/",
    "/api/v1/user_account/4/",
    "/api/v1/user_account/6/"
  ]
  "resource_uri": "/api/v1/access_point/2/",
}
```

### [GET /api/v1/access_point?access_point_name=`$access_point_name`](#get-apiv1access_pointaccess_point_nameaccess_point_name)

Returns an array of access points with the given access point name. Multiple access points many have the same name. If the access point name contains spaces, those spaces should be present, and the name should not be placed in quotes of any kind.

An example JSON object is as follows:

```
{
  "meta": {
    "limit": 20,
    "next": null,
    "offset": 0,
    "previous": null,
    "total_count": 1
  },
  "objects": [
    {
      "access_point_name": "Metcalf East",
      "created_by": "/api/v1/user_account/1/",
      "modified_by": "/api/v1/user_account/1/",
      "parent": "/api/v1/resource/1/",
       "users": [
         "/api/v1/user_account/1/",
         "/api/v1/user_account/2/",
         "/api/v1/user_account/3/",
         "/api/v1/user_account/4/",
         "/api/v1/user_account/6/"
       ]
      "id": 1,
      "resource_uri": "/api/v1/access_point/1/"
    }
  ]
}
```

### [GET /api/v1/access_point?resource=`$resource`](#get-apiv1access_pointresourceresource)

Returns an array of access points belonging to the given resource. The variable $resource should contain the ID of the resource in question.

An example JSON object is as follows:

```
{
  "meta": {
    "limit": 20,
    "next": null,
    "offset": 0,
    "previous": null,
    "total_count": 2
  },
  "objects": [
    {
      "access_point_name": "Metcalf West",
      "parent": "/api/v1/resource/1/",
      "created_by": "/api/v1/user_account/1/",
      "modified_by": "/api/v1/user_account/1/",
      "users": [
        "/api/v1/user_account/1/",
        "/api/v1/user_account/2/",
        "/api/v1/user_account/3/",
        "/api/v1/user_account/4/",
        "/api/v1/user_account/6/"
      ]
      "id": 2,
      "resource_uri": "/api/v1/access_point/2/"
    },
    {
      "access_point_name": "Metcalf East",
      "parent": "/api/v1/resource/1/",
      "created_by": "/api/v1/user_account/1/",
      "modified_by": "/api/v1/user_account/1/",
       "users": [
         "/api/v1/user_account/1/",
         "/api/v1/user_account/4/",
         "/api/v1/user_account/6/"
       ]
      "id": 1,
      "resource_uri": "/api/v1/access_point/1/"
    }
  ]
}
```


### [POST /api/v1/access_point](#post-apiv1access_point)

Sends a new access point object to the database.

The object to be send should have the following fields. Any additional fields will be ignored.

|  Field          | Value Type      | Description                                                      | Example                 |
|-----------------|-----------------|------------------------------------------------------------------|-------------------------|
| access_point_name | `STRING`      | The name of this access point.                                   | `Halligan Main Entrance`  |
| parent          | `STRING`        | The resource to which this access point belongs.                 | `/api/v1/resource/1    `  |
| users           | `STRING[]`      | An array of references to users who have access to this access point. | `[ "/api/v1/user_account/1", ... ]` |
| created_by      | `STRING`        | The user who created this access point.                          | `/api/v1/user_account/1`  |
| modified_by     | `STRING`        | The user who last modified this access point.                    | `/api/v1/user_account/1`  |

The header of the HTTP request must match the format of the data being sent, and that format must be either JSON or XML. All fields above *must* be included. 

## [Resource](#resource)

A resource is a collection of access points, e.g. a building; a resource is something with a distinct address.

### [GET /api/v1/resource/`$id`](#get-apiv1resourceid)

Returns the domain with the given ID. 

|  Field          | Value Type      | Description                                                      | Example                 |
|-----------------|-----------------|------------------------------------------------------------------|-------------------------|
| resource_name   | `STRING`        | The name of the resource.                                        | `Halligan Hall`           |
| address         | `STRING`        | The address at which the resource resides.                       | `161 College Ave`         |
| city            | `STRING`        | The city in which the resource resides. Can be null.             | `Medfor`                 |
| state           | `STRING`        | state in which the resource resides. Can be null.                | `MA`                      |
| zipcode         | `STRING`        | The area code in which the resource resides.                     | `0215`                   |
| country         | `STRING`        | The country in which the resource resides.                       | `United State`           |
| parent          | `STRING`        | A reference to the domain which contains this resource.          | `/api/v1/domain/1`        |
| children        | `ACCESS_POINT[]`| An array of objects containing the access points belonging to the resource. | `{[ {"id":1, ...}, ... ]` |
| created_by      | `STRING`        | The user who created this resource.                              | `/api/v1/user_account/1`  |
| modified_by     | `STRING`        | The user who last modified this resource.                        | `/api/v1/user_account/1`  |
| id              | `INT`           | Has value `$id`.                                                 | ``                       |
| resource_uri    | `STRING`        | Has value '/api/v1/resource/`$id`'.                              | `/api/v1/resource/1`      |

An example JSON object is as follows:

```
{
  "address": "56 Professors Row",
  "children": [
    {
      "access_point_name": "Metcalf East",
      "created_by": "/api/v1/user_account/1/",
      "id": 1,
      "modified_by": "/api/v1/user_account/1/",
      "parent": "/api/v1/resource/1/",
      "resource_uri": "/api/v1/access_point/1/",
      "users": [
        "/api/v1/user_account/1/",
        "/api/v1/user_account/2/",
        "/api/v1/user_account/3/",
        "/api/v1/user_account/4/",
        "/api/v1/user_account/6/"
      ]
    },
    {
      "access_point_name": "Metcalf West",
      "created_by": "/api/v1/user_account/1/",
      "id": 2,
      "modified_by": "/api/v1/user_account/1/",
      "parent": "/api/v1/resource/1/",
      "resource_uri": "/api/v1/access_point/2/",
      "users": [
        "/api/v1/user_account/1/",
        "/api/v1/user_account/2/",
        "/api/v1/user_account/3/",
        "/api/v1/user_account/4/",
        "/api/v1/user_account/6/"
      ]
    }
  ],
  "city": "Medford",
  "country": "United States",
  "created_by": "/api/v1/user_account/1/",
  "id": 1,
  "modified_by": "/api/v1/user_account/1/",
  "parent": "/api/v1/domain/5/",
  "resource_name": "Metcalf Hall",
  "resource_uri": "/api/v1/resource/1/",
  "state": "MA",
  "zipcode": "02155"
}
```

### [GET /api/v1/resource?resource_name=`$resource_name`](#get-apiv1resourceresource_nameresource_name)

Returns an array of resources with the resource name set to `$resource_name`.
Note that requests with the `?` query operator can be chained, e.g. `/api/v1/resource/?city=$city&zipcode=$zipcode`.

### [GET /api/v1/resource?city=`$city`](#get-apiv1resourcecitycity)

Returns an array of resources with the city set to `$city`.
Note that requests with the `?` query operator can be chained, e.g. `/api/v1/resource/?city=$city&zipcode=$zipcode`.

### [GET /api/v1/resource?state=`$state`](#get-apiv1resourcestatestate)

Returns an array of resources with the state set to `$state`.
Note that requests with the `?` query operator can be chained, e.g. `/api/v1/resource/?city=$city&zipcode=$zipcode`.

### [GET /api/v1/resource?country=`$country`](#get-apiv1resourcecountrycountry)

Returns an array of resources with the country set to `$country`.
Note that requests with the `?` query operator can be chained, e.g. `/api/v1/resource/?city=$city&zipcode=$zipcode`.

### [GET /api/v1/resource?address=`$address`](#get-apiv1resourceaddressaddress)

Returns an array of resources with the address set to `$address`.
Note that requests with the `?` query operator can be chained, e.g. `/api/v1/resource/?city=$city&zipcode=$zipcode`.

### [GET /api/v1/resource?zipcode=`$zipcode`](#get-apiv1resourcezipcodezipcode)

Returns an array of resources with the zipcode set to `$zipcode`.
Note that requests with the `?` query operator can be chained, e.g. `/api/v1/resource/?city=$city&zipcode=$zipcode`.

### [POST /api/v1/resource](#post-apiv1resource)

Sends a new resource object to the database.

The object to be send should have the following fields. Any additional fields will be ignored.

|  Field          | Value Type      | Description                                                      | Example                 |
|-----------------|-----------------|------------------------------------------------------------------|-------------------------|
| resource_name   | `STRING`        | The name of the resource.                                        | `Halligan Hall`           |
| address         | `STRING`        | The address at which the resource resides.                       | `161 College Ave`         |
| city            | `STRING`        | The city in which the resource resides. Can be null.             | `Medford`                 |
| state           | `STRING`        | state in which the resource resides. Can be null.                | `MA`                      |
| zipcode         | `STRING`        | The area code in which the resource resides.                     | `02155`                   |
| country         | `STRING`        | The country in which the resource resides.                       | `United States`           |
| parent          | `STRING`        | A reference to the domain which contains this resource.          | `/api/v1/domain/1`        |
| children        | `ACCESS_POINT[]`| An array of objects containing the access points belonging to the resource. | `{[ {"id":1, ...}, ... ]}` |
| created_by      | `STRING`        | The user who created this resource.                              | `/api/v1/user_account/1`  |
| modified_by     | `STRING`        | The user who last modified this resource.                        | `/api/v1/user_account/1`  |

The header of the HTTP request must match the format of the data being sent, and that format must be either JSON or XML. All fields above *must* be included. 

Fields will be checked for validity (e.g. zipcode) before being added; badly formatted request may be rejected.

## [Domain](#domain)

A domain is a collection of resources. In any structured access control system, navigating the vast variety of available access points and resources can be difficult, and it can be impossible to display and navigate through all possible resources. As such, domains are used to hierarchally organize resources. A domain can contain resources, other domains, or both, and can have a parent which is another domain or `null` if this domain is the root of the tree. As domains are abstract organizational tools, they have no structural information besides an identifying, non-unique name. 

### [GET /api/v1/domain/`$id`](#get-apiv1domainid)

Returns the domain with the given ID. The value of the `parent` field can be `null`.

|  Field          | Value Type      | Description                                                      | Example                 |
|-----------------|-----------------|------------------------------------------------------------------|-------------------------|
| domain_name     | `STRING`        | The name of the domain point.                                    | `Halligan Hall`           |
| parent          | `STRING`        | A reference to the domain which contains this resource.          | `/api/v1/user_account/1`  |
| resource_children | `RESOURCE[]`  | An array of objects containing the resources belonging to the domain. | `{[ {"id":1, ...}, ... ]}` |
| domain_children | `DOMAIN[]`      | An array of objects containing the sub-domains belonging to the domain. | `{[ {"id":1, ...}, ... ]}` |
| created_by      | `STRING`        | The user who created this domain.                                | `/api/v1/user_account/1`  |
| modified_by     | `STRING`        | The user who last modified this domain.                          | `/api/v1/user_account/1`  |
| id              | `INT`           | Has value `$id`.                                                 | `1`                       |
| resource_uri    | `STRING`        | Has value '/api/v1/resource/`$id`'.                              | `/api/v1/resource/1`      |

An example JSON object is as follows. Note that within the domain, sub-domains and resources are fully expanded, and not passed by a URI reference.

```
{
  "created_by": "/api/v1/user_account/1/",
  "domain_children": [
    {
      "created_by": "/api/v1/user_account/1/",
      "domain_children": [
        {
          "created_by": "/api/v1/user_account/1/",
          "domain_children": [],
          "domain_name": "CS Department",
          "id": 2,
          "modified_by": "/api/v1/user_account/1/",
          "parent": "/api/v1/domain/4/",
          "resource_children": [
            {
              "address": "161 College Ave",
              "children": [
                {
                  "access_point_name": "Main Entrance",
                  "created_by": "/api/v1/user_account/1/",
                  "id": 3,
                  "modified_by": "/api/v1/user_account/1/",
                  "parent": "/api/v1/resource/2/",
                  "resource_uri": "/api/v1/access_point/3/",
                  "users": [
                    "/api/v1/user_account/1/",
                    "/api/v1/user_account/2/",
                    "/api/v1/user_account/4/",
                    "/api/v1/user_account/6/"
                  ]
                },
                {
                  "access_point_name": "Halligan Extension Entrance",
                  "created_by": "/api/v1/user_account/1/",
                  "id": 4,
                  "modified_by": "/api/v1/user_account/1/",
                  "parent": "/api/v1/resource/2/",
                  "resource_uri": "/api/v1/access_point/4/",
                  "users": [
                    "/api/v1/user_account/3/"
                  ]
                }
              ],
              "city": "Medford",
              "country": "United States",
              "created_by": "/api/v1/user_account/1/",
              "id": 2,
              "modified_by": "/api/v1/user_account/1/",
              "parent": "/api/v1/domain/2/",
              "resource_name": "Halligan Hall",
              "resource_uri": "/api/v1/resource/2/",
              "state": "MA",
              "zipcode": "02155"
            }
          ],
          "resource_uri": "/api/v1/domain/2/"
        },
        {
          "created_by": "/api/v1/user_account/1/",
          "domain_children": [],
          "domain_name": "Physics Department",
          "id": 3,
          "modified_by": "/api/v1/user_account/1/",
          "parent": "/api/v1/domain/4/",
          "resource_children": [
            {
              "address": "574 Boston Ave",
              "children": [
                {
                  "access_point_name": "Main Entrance",
                  "created_by": "/api/v1/user_account/1/",
                  "id": 5,
                  "modified_by": "/api/v1/user_account/1/",
                  "parent": "/api/v1/resource/3/",
                  "resource_uri": "/api/v1/access_point/5/",
                  "users": [
                    "/api/v1/user_account/1/",
                    "/api/v1/user_account/2/",
                    "/api/v1/user_account/4/",
                    "/api/v1/user_account/6/"
                  ]
                },
                {
                  "access_point_name": "Physics Department",
                  "created_by": "/api/v1/user_account/1/",
                  "id": 6,
                  "modified_by": "/api/v1/user_account/1/",
                  "parent": "/api/v1/resource/3/",
                  "resource_uri": "/api/v1/access_point/6/",
                  "users": [
                    "/api/v1/user_account/2/"
                  ]
                }
              ],
              "city": "Medford",
              "country": "United States",
              "created_by": "/api/v1/user_account/1/",
              "id": 3,
              "modified_by": "/api/v1/user_account/1/",
              "parent": "/api/v1/domain/3/",
              "resource_name": "CLIC Building",
              "resource_uri": "/api/v1/resource/3/",
              "state": "MA",
              "zipcode": "02155"
            }
          ],
          "resource_uri": "/api/v1/domain/3/"
        }
      ],
      "domain_name": "Academic",
      "id": 4,
      "modified_by": "/api/v1/user_account/1/",
      "parent": "/api/v1/domain/1/",
      "resource_children": [],
      "resource_uri": "/api/v1/domain/4/"
    },
    {
      "created_by": "/api/v1/user_account/1/",
      "domain_children": [
        {
          "created_by": "/api/v1/user_account/1/",
          "domain_children": [],
          "domain_name": "Area 2",
          "id": 5,
          "modified_by": "/api/v1/user_account/1/",
          "parent": "/api/v1/domain/6/",
          "resource_children": [
            {
              "address": "200 Packard Ave",
              "children": [
                {
                  "access_point_name": "Main Entrance",
                  "created_by": "/api/v1/user_account/1/",
                  "id": 7,
                  "modified_by": "/api/v1/user_account/1/",
                  "parent": "/api/v1/resource/4/",
                  "resource_uri": "/api/v1/access_point/7/",
                  "users": []
                }
              ],
              "city": "Medford",
              "country": "United States",
              "created_by": "/api/v1/user_account/1/",
              "id": 4,
              "modified_by": "/api/v1/user_account/1/",
              "parent": "/api/v1/domain/5/",
              "resource_name": "Carmichael Hall",
              "resource_uri": "/api/v1/resource/4/",
              "state": "MA",
              "zipcode": "02155"
            },
            {
              "address": "56 Professors Row",
              "children": [
                {
                  "access_point_name": "Metcalf East",
                  "created_by": "/api/v1/user_account/1/",
                  "id": 1,
                  "modified_by": "/api/v1/user_account/1/",
                  "parent": "/api/v1/resource/1/",
                  "resource_uri": "/api/v1/access_point/1/",
                  "users": [
                    "/api/v1/user_account/1/",
                    "/api/v1/user_account/2/",
                    "/api/v1/user_account/3/",
                    "/api/v1/user_account/4/",
                    "/api/v1/user_account/6/"
                  ]
                },
                {
                  "access_point_name": "Metcalf West",
                  "created_by": "/api/v1/user_account/1/",
                  "id": 2,
                  "modified_by": "/api/v1/user_account/1/",
                  "parent": "/api/v1/resource/1/",
                  "resource_uri": "/api/v1/access_point/2/",
                  "users": [
                    "/api/v1/user_account/1/",
                    "/api/v1/user_account/2/",
                    "/api/v1/user_account/3/",
                    "/api/v1/user_account/4/",
                    "/api/v1/user_account/6/"
                  ]
                }
              ],
              "city": "Medford",
              "country": "United States",
              "created_by": "/api/v1/user_account/1/",
              "id": 1,
              "modified_by": "/api/v1/user_account/1/",
              "parent": "/api/v1/domain/5/",
              "resource_name": "Metcalf Hall",
              "resource_uri": "/api/v1/resource/1/",
              "state": "MA",
              "zipcode": "02155"
            }
          ],
          "resource_uri": "/api/v1/domain/5/"
        }
      ],
      "domain_name": "Residental",
      "id": 6,
      "modified_by": "/api/v1/user_account/1/",
      "parent": "/api/v1/domain/1/",
      "resource_children": [],
      "resource_uri": "/api/v1/domain/6/"
    }
  ],
  "domain_name": "Tufts University",
  "id": 1,
  "modified_by": "/api/v1/user_account/1/",
  "parent": null,
  "resource_children": [],
  "resource_uri": "/api/v1/domain/1/"
}
```

### [GET /api/v1/domain?domain_name=`$domain_name`](#get-apiv1domaindomain_namedomain_name)

Returns an array of domains with the domain name set to `$domain_name`.

### [POST /api/v1/domain](#post-apiv1domain)

Sends a new domain object to the database.

The object to be send should have the following fields. Any additional fields will be ignored.

|  Field          | Value Type      | Description                                                      | Example                 |
|-----------------|-----------------|------------------------------------------------------------------|-------------------------|
| domain_name     | `STRING`        | The name of the domain point.                                    | `Halligan Hall`           |
| parent          | `STRING`        | A reference to the domain which contains this resource.          | `/api/v1/user_account/1`  |
| resource_children | `RESOURCE[]`  | An array of objects containing the resources belonging to the domain. | `{[ {"id":1, ...}, ... ]}` |
| domain_children | `DOMAIN[]`      | An array of objects containing the sub-domains belonging to the domain. | `{[ {"id":1, ...}, ... ]}` |
| created_by      | `STRING`        | The user who created this domain.                                | `/api/v1/user_account/1`  |
| modified_by     | `STRING`        | The user who last modified this domain.                          | `/api/v1/user_account/1`  |

The header of the HTTP request must match the format of the data being sent, and that format must be either JSON or XML. All fields above *must* be included. 

Fields will be checked for validity before being added to the database.

**Note:** Though the value of a given domain's `parent` field can be `null`, posting new objects with a `null` parent will result in an error; only one root domain is allowed to have a `parent` of `null`.


## [Request](#request)

A request is an item connecting a user account to a new group of domains or a new card; this is the primary mode by which modification are made to cards. When a request is made, managers with appropriate clearance will be able to see and interact with the request and thereby accept or reject it from inside the CardControl system.

Status codes follow the following pattern:

| Status | Description |
|--------|-------------|
| 0      | Pending     |
| 1      | Accepted    |
| 2      | Comments    |
| 3      | Rejected    |

### [GET /api/v1/request/`$id`](#get-apiv1requestid)

Returns the request with the given ID. 

|  Field          | Value Type      | Description                                                      | Example                 |
|-----------------|-----------------|------------------------------------------------------------------|-------------------------|
| user            | `STRING`        | The user account on whose behalf this request is being made.     | `/api/v1/user_account/1`  |
| new_access_points| `STRING[]`     | A list of access points to which the user requests access, in addition to current ones. | `[ /api/v1/access_point/1, ... ]` |
| new_card        | `STRING`        | A reference to the edited card which the user wishes to make their active card | `/api/v1/edited_card/1` |
| feedback        | `STRING`        | The manager feedback on this request.                            | `"Accepted."`  |
| reason          | `STRING`        | The justification as to why this request should be accepted.     | `"Have class there."` |
| request_level   | `INT`           | The manager level needed to clear this request.                  | `2`                   |
| status          | `INT`           | 0 == open, 1 == accepted, 2 == rejected                          | `0`                   |
| created_at      | `DATETIME`      | The time at which the request was submitted                      | `2017-04-06T18:44:27.931607` |
| modified_at     | `DATETIME`      | The time at which the request was last modified                  | `2017-04-06T18:44:27.931607` |
| created_by      | `STRING`        | The user who created this access point.                          | `/api/v1/user_account/1`  |
| modified_by     | `STRING`        | The user who last modified this access point.                    | `/api/v1/user_account/1`  |
| id              | `INT`           | Has value `$id`.                                                 | `1`                       |
| resource_uri    | `STRING`        | Has value '/api/v1/resource/`$id`'.                              | `/api/v1/resource/1`      |

An example JSON object is as follows:

```
{
  "user": "/api/v1/user_account/1/"
  "new_access_points": [],
  "new_card": "/api/v1/card/5/",
  "feedback": null,
  "reason": null,
  "request_level": 1,
  "status": 0,
  "created_at": "2017-04-06T18:44:27.931607",
  "modified_at": "2017-04-06T18:44:27.931607",
  "created_by": "/api/v1/user_account/1/",
  "modified_by": "/api/v1/user_account/1/",
  "id": 1,
  "resource_uri": "/api/v1/request/1/",
}
```

### [GET /api/v1/request/?user=`$user`](#get-apiv1requestuseruser)

Returns an array of access points with the resource name set to `$user`.
Note that requests with the `?` query operator can be chained, e.g. `/api/v1/request/?status=$status&created_at=$created_at`.

### [GET /api/v1/request/?request_level=`$request_level`](#get-apiv1request_levelrequest_level)

Returns an array of access points with the request_level set to `$request_level`.
Note that requests with the `?` query operator can be chained, e.g. `/api/v1/request/?status=$status&created_at=$created_at`.

### [GET /api/v1/request/?status=`$status`](#get-apiv1requeststatusstatus)

Returns an array of access points with the status set to `$status`.
Note that requests with the `?` query operator can be chained, e.g. `/api/v1/request/?status=$status&created_at=$created_at`.

### [GET /api/v1/request/?modified_at=`$modified_at`](#get-apiv1requestmodified_atmodified_at)

Returns an array of access points with the modified_at set to `$modified_at`.
Note that requests with the `?` query operator can be chained, e.g. `/api/v1/request/?status=$status&created_at=$created_at`.

### [GET /api/v1/request/?created_at=`$created_at`](#get-apiv1requestcreated_atcreated_at)

Returns an array of access points with the created_at set to `$created_at`.
Note that requests with the `?` query operator can be chained, e.g. `/api/v1/request/?status=$status&created_at=$created_at`.

### [POST /api/v1/request`](#post-apiv1request)

Sends a new access point object to the database.

The object to be send should have the following fields. Any additional fields will be ignored.

|  Field          | Value Type      | Description                                                      | Example                 |
|-----------------|-----------------|------------------------------------------------------------------|-------------------------|
| user            | `STRING`        | The user account on whose behalf this request is being made.     | `/api/v1/user_account/1`  |
| new_access_points| `STRING[]`     | A list of access points to which the user requests access, in addition to current ones. | `[ /api/v1/access_point/1, ... ]` |
| new_card        | `STRING`        | A reference to the edited card which the user wishes to make their active card | `/api/v1/edited_card/1` |
| feedback        | `STRING`        | The manager feedback on this request.                            | `"Accepted."`  |
| reason          | `STRING`        | The justification as to why this request should be accepted.     | `"Have class there."` |
| request_level   | `INT`           | The manager level needed to clear this request.                  | `2`                   |
| status          | `INT`           | Status, as described above.                                      | `0`                   |
| created_at      | `DATETIME`      | The time at which the request was submitted                      | `2017-04-06T18:44:27.931607` |
| modified_at     | `DATETIME`      | The time at which the request was last modified                  | `2017-04-06T18:44:27.931607` |
| created_by      | `STRING`        | The user who created this access point.                          | `/api/v1/user_account/1`  |
| modified_by     | `STRING`        | The user who last modified this access point.                    | `/api/v1/user_account/1`  |

The header of the HTTP request must match the format of the data being sent, and that format must be either JSON or XML. All fields above *must* be included. 

Fields will be checked for validity; for example, changing the status is not allowed if the user in question is not a manager.
