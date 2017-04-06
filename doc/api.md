
# Introduction

Hello! Welcome to the CardControl API. This interface allows you to interact with your ID card directly, submitting critical requests from the comfort of your own environment, or wrapping our service in a more convenient form. The following serves as documentation for our API, and will hopefully guide you well in your access control ventures. 

# Table of Contents
[Notes](#notes)
GET /api/v1/card/`$id`
GET /api/v1/card?utln=`$utln`
POST/PUT /api/v1/card
GET /api/v1/user_account/`$id`
GET /api/v1/user_account?utln=`$utln`
POST/PUT /api/v1/user_account
GET /api/v1/access_point/`$id`
GET /api/v1/access_point?access_point_name=`$access_point_name`
GET /api/v1/access_point?resource=`$resource`
POST/PUT /api/v1/access_point
GET /api/v1/resource/`$id`
GET /api/v1/resource?resource_name=`$resource_name`
GET /api/v1/resource?city=`$city`
GET /api/v1/resource?state=`$state`
GET /api/v1/resource?country=`$country`
GET /api/v1/resource?address=`$address`
GET /api/v1/resource?zipcode=`$zipcode`
POST/PUT /api/v1/resource
GET /api/v1/request/`$id`
GET /api/v1/request/?user=`$user`
GET /api/v1/request/?request_level=`$request_level`
GET /api/v1/request/?status=`$status`
GET /api/v1/request/?modified_at=`$modified_at`
GET /api/v1/request/?created_at=`$created_at`
PUT/POST /api/v1/request` 

### [Notes](#notes)

* The current production URL of our service is http://34.193.86.61/. All paths referenced in the following documentation should be appended to that URL.

* Our production URL is subject to change as our still-developing architecture evolves, but the relative paths referenced here are guaranteed for our users.


# Structure of the API

Our API has a single main endpoint at `/api/` which is a reference to this documentation. This supports only a simple `GET` request, as it is simply documentation for the API to follow.

We maintain a versioning system for the API. For now, there exists an endpoint `/api/v1/` where the CardControl API is running — in the future, we may add other API versions with different support and different interfaces.

The API has six major components. Each supports different operations. They are as follows:

|  Module         | Allowed Methods |
|-----------------|-----------------|
| card            | GET, PUT, POST  |
| user_account    | GET, PUT, POST  |
| access_point    | GET, PUT, POST  |
| resource        | GET, PUT, POST  |
| request         | GET, PUT, POST  |

The use and description of each component will be in the following six sections.

The data returned from or sent to a given API endpoint can be either JSON or XML. All fields above *must* be included. To change the format when making a request from the browser, the parameter `?format=json` or `?format=xml` can be appended to any endpoint on any `GET` request to force the API to ignore HTTP headers and return a given format.

In the documentation below, the `$` symbol will be used to denote variable values; for example the string `$utln` will be used to denote the UTLN of a given user, which could be e.g. `jsmith01` or `mredis05`, or the variable `$id` could be the integer `1`, `2`, or `438`. 

We use a system of queries to filter responses by a given attribute. The root path to a component, e.g. `/api/v1/request/` can be followed by the symbol `?` to filter all requests by a set of allowed values documented below.

## Card

A card is an object representing the physical ID card each system user holds. It contains all relevant text fields one would find on the card. The relevant methods are as follows:

### GET /api/v1/card/`$id`

Returns the card with a given ID. This is not the card ID of the institution, but rather a unique identifier beginning from 1, identifying cards within the CardControl system.

|  Field          | Value Type      | Description                                                      | Example                 |
|-----------------|-----------------|------------------------------------------------------------------|-------------------------|
| barcode         | INT             | The numeric barcode value of the ID.                             | 123456789               |
| birth_date      | DATETIME        | The bithdate of the card owner.                                  | 1996-04-06              |
| class_year      | INT             | The class year of the card owner. Must be a 4-digit integer.     | 2017                    |
| first_name      | STRING          | The first name of the card owner.                                | John                    |
| last_name       | STRING          | The last name of the card owner.                                 | Smith                   |
| middle_initial  | CHAR            | The middle initial of the card owner. Must be a single character.| A                       |
| jumbocash_id    | INT             | The campus money system ID of the card owner.                    | 987654321               |
| school          | STRING          | The school within the university to which the card owner belongs.| Liberal Arts            |
| student_type    | STRING          | The type of community member the card owner is.                  | Graduate                |
| utln            | STRING          | The UTLN of the card owner.                                      | jsmith01                |
| id              | INT             | Has value $id.                                                   | 1                       |
| resource_uri    | STRING          | Has value '/api/v1/card/$id'.                                    | /api/v1/card/1          |

An example JSON object is as follows:

```
{
  "barcode": 0,
  "birth_date": "1996-10-02",
  "class_year": 2019,
  "first_name": "Harrison",
  "id": 1,
  "jumbocash_id": 111222333,
  "last_name": "Kaiser",
  "middle_initial": "M",
  "resource_uri": "/api/v1/card/1/",
  "school": "Liberal Arts",
  "student_type": "Undergraduate",
  "utln": "hkaise01"
}
```

### GET /api/v1/card?utln=`$utln`

Returns all available cards in a list format. In JSON, this is an array. The card objects are exactly as above. Users are only allowed access to cards which match their UTLN, and as such this method is only allowed if the user is authenticated and $utln is equal to that user's UTLN.

### POST/PUT /api/v1/card

Sends a new card object to be created in the database. This will only work if the UTLN of the user_account sending the request is equal to the card's UTLN, or if the user account in question is a manager.

The object to be send should have the following fields. Any additional fields will be ignored.

|  Field          | Value Type      | Description                                                      | Example                 |
|-----------------|-----------------|------------------------------------------------------------------|-------------------------|
| barcode         | INT             | The numeric barcode value of the ID.                             | 123456789               |
| birth_date      | DATETIME        | The bithdate of the card owner.                                  | 1996-04-06              |
| class_year      | INT             | The class year of the card owner. Must be a 4-digit integer.     | 2017                    |
| first_name      | STRING          | The first name of the card owner.                                | John                    |
| last_name       | STRING          | The last name of the card owner.                                 | Smith                   |
| middle_initial  | CHAR            | The middle initial of the card owner. Must be a single character.| A                       |
| jumbocash_id    | INT             | The campus money system ID of the card owner.                    | 987654321               |
| school          | STRING          | The school within the university to which the card owner belongs.| Liberal Arts            |
| student_type    | STRING          | The type of community member the card owner is.                  | Graduate                |
| utln            | STRING          | The UTLN of the card owner.                                      | jsmith01                |

The header of the HTTP request must match the format of the data being sent, and that format must be either JSON or XML. All fields above *must* be included. 

## User Account

A user account is the primary means by which users interact with the system. Each user has a user account with a unique UTLN, and this identifies the user across the system. A user account posesses a card, an access level, and a set of resources, domains, and access points to which that user has access. A card is considered 'active' if and only if the user_account with the same UTLN has its card reference set to that card.

### GET /api/v1/user_account/`$id`

Returns the user account with the given ID. A manager level is an integer corresponding to how much system control a given user has. A manager level of 0 is an unpriveleged user, a manager level of 1 is a user who manages one or more resources, and a manager level of 2 is a user who is a system administrator for the CardControl system. Other values are invalid.

|  Field          | Value Type      | Description                                                      | Example                 |
|-----------------|-----------------|------------------------------------------------------------------|-------------------------|
| utln            | STRING          | The unqiue UTLN username associated with the user.               | jsmith01                |
| first_name      | STRING          | The first name of the user.                                      | John                    |
| last_name       | STRING          | The last name of the user.                                       | Smith                   |
| manager_level   | INT             | 0 == unpriveleged, 1 == resource manager, 2 == system manager    | 2                       |
| card            | STRING          | A reference to the active card of the user.                      | /api/v1/card/1          |
| access_points   | STRING[]        | An array of references to the access points this user can enter. | [/api/v1/access_point/1]|
| resources_managed | STRING[]      | An array of resources which this user manages.                   | [/api/v1/resource/1]    |
| id              | INT             | Has value $id.                                                   | 1                       |
| resource_uri    | STRING          | Has value '/api/v1/user_account/$id'.                            | /api/v1/user_account/1  |

An example JSON object is as follows:

```
{
  "access_points": [
    "/api/v1/access_point/1/",
    "/api/v1/access_point/2/",
    "/api/v1/access_point/3/",
    "/api/v1/access_point/5/"
  ],
  "card": "/api/v1/card/2/",
  "first_name": "Matthew",
  "id": 1,
  "last_name": "Asnes",
  "manager_level": 2,
  "resource_uri": "/api/v1/user_account/1/",
  "resources_managed": [
    "/api/v1/resource/1/",
    "/api/v1/resource/2/"
  ],
  "utln": "masnes01"
}
```

### GET /api/v1/user_account?utln=`$utln`

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
      "access_points": [
        "/api/v1/access_point/1/",
        "/api/v1/access_point/2/",
        "/api/v1/access_point/3/",
        "/api/v1/access_point/5/"
      ],
      "card": "/api/v1/card/2/",
      "first_name": "Matthew",
      "id": 1,
      "last_name": "Asnes",
      "manager_level": 2,
      "resource_uri": "/api/v1/user_account/1/",
      "resources_managed": [
        "/api/v1/resource/1/",
        "/api/v1/resource/2/"
      ],
      "utln": "masnes01"
    }
  ]
}
```


### POST/PUT /api/v1/user_account

Sends a new user_account object to be created in the database. 

The object to be send should have the following fields. Any additional fields will be ignored.

|  Field          | Value Type      | Description                                                      | Example                 |
|-----------------|-----------------|------------------------------------------------------------------|-------------------------|
| utln            | STRING          | The unqiue UTLN username associated with the user.               | jsmith01                |
| first_name      | STRING          | The first name of the user.                                      | John                    |
| last_name       | STRING          | The last name of the user.                                       | Smith                   |
| manager_level   | INT             | 0 == unpriveleged, 1 == resource manager, 2 == system manager    | 2                       |
| card            | STRING          | A reference to the active card of the user.                      | /api/v1/card/1          |
| access_points   | STRING[]        | An array of references to the access points this user can enter. | [/api/v1/access_point/1]|
| resources_managed | STRING[]      | An array of resources which this user manages.                   | [/api/v1/resource/1]    |

The header of the HTTP request must match the format of the data being sent, and that format must be either JSON or XML. All fields above *must* be included. 


## Access Point

An access point is any single location to which access can be granted or revoked, e.g. a door on campus, or a web application.

### GET /api/v1/access_point/`$id`

Returns the access point with the given ID. 

|  Field          | Value Type      | Description                                                      | Example                 |
|-----------------|-----------------|------------------------------------------------------------------|-------------------------|
| access_point_name | STRING        | The name of this access point.                                   | Halligan Main Entrance  |
| resource        | STRING          | The resource to which this access point belongs.                 | /api/v1/resource/1      |
| created_by      | STRING          | The user who created this access point.                          | /api/v1/user_account/1  |
| modified_by     | STRING          | The user who last modified this access point.                    | /api/v1/user_account/1  |
| id              | INT             | Has value $id.                                                   | 1                       |
| resource_uri    | STRING          | Has value '/api/v1/access_point/$id'.                            | /api/v1/access_point/1  |

An example JSON object is as follows:

```
{
  "access_point_name": "Metcalf East",
  "resource": "/api/v1/resource/1/",
  "modified_by": "/api/v1/user_account/1/",
  "created_by": "/api/v1/user_account/1/",
  "resource_uri": "/api/v1/access_point/1/"
  "id": 1,
}
```

### GET /api/v1/access_point?access_point_name=`$access_point_name`

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
      "id": 1,
      "modified_by": "/api/v1/user_account/1/",
      "resource": "/api/v1/resource/1/",
      "resource_uri": "/api/v1/access_point/1/"
    }
  ]
}
```

### GET /api/v1/access_point?resource=`$resource`

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
      "created_by": "/api/v1/user_account/1/",
      "id": 2,
      "modified_by": "/api/v1/user_account/1/",
      "resource": "/api/v1/resource/1/",
      "resource_uri": "/api/v1/access_point/2/"
    },
    {
      "access_point_name": "Metcalf East",
      "created_by": "/api/v1/user_account/1/",
      "id": 1,
      "modified_by": "/api/v1/user_account/1/",
      "resource": "/api/v1/resource/1/",
      "resource_uri": "/api/v1/access_point/1/"
    }
  ]
}
```


### POST/PUT /api/v1/access_point

Sends a new access point object to the database.

The object to be send should have the following fields. Any additional fields will be ignored.

|  Field          | Value Type      | Description                                                      | Example                 |
|-----------------|-----------------|------------------------------------------------------------------|-------------------------|
| access_point_name | STRING        | The name of this access point.                                   | Halligan Main Entrance  |
| resource        | STRING          | The resource to which this access point belongs.                 | /api/v1/resource/1      |
| created_by      | STRING          | The user who created this access point.                          | /api/v1/user_account/1  |
| modified_by     | STRING          | The user who last modified this access point.                    | /api/v1/user_account/1  |

The header of the HTTP request must match the format of the data being sent, and that format must be either JSON or XML. All fields above *must* be included. 



## Resource

A resource is a collection of access points, e.g. a building; a resource is something with a distinct address.

### GET /api/v1/resource/`$id`

Returns the access point with the given ID. 

|  Field          | Value Type      | Description                                                      | Example                 |
|-----------------|-----------------|------------------------------------------------------------------|-------------------------|
| resource_name   | STRING          | The name of the access point.                                    | Halligan Hall           |
| city            | STRING          | The city in which the access point resides. Can be null.         | Medford                 |
| country         | STRING          | The country in which the access point resides.                   | /api/v1/user_account/1  |
| state           | STRING          | state in which the access point resides. Can be null.            | /api/v1/user_account/1  |
| address         | STRING          | The address at which the access point resides.                   | 161 College Ave         |
| zipcode         | STRING          | The area code in which the access point resides.                 | 02155                   |
| created_by      | STRING          | The user who created this access point.                          | /api/v1/user_account/1  |
| modified_by     | STRING          | The user who last modified this access point.                    | /api/v1/user_account/1  |
| id              | INT             | Has value `$id`.                                                 | 1                       |
| resource_uri    | STRING          | Has value '/api/v1/resource/`$id`'.                              | /api/v1/resource/1      |

An example JSON object is as follows:

```
{
  "city": "Medford",
  "country": "United States",
  "created_by": "/api/v1/user_account/1/",
  "id": 1,
  "modified_by": "/api/v1/user_account/1/",
  "resource_name": "Metcalf Hall",
  "resource_uri": "/api/v1/resource/1/",
  "state": "MA",
  "street": "56 Professors Row",
  "zipcode": "02155"
}
```

### GET /api/v1/resource?resource_name=`$resource_name`
Returns an array of access points with the resource name set to `$resource_name`.
Note that requests with the `?` query operator can be chained, e.g. `/api/v1/resource/?city=$city&zipcode=$zipcode`.

### GET /api/v1/resource?city=`$city`
Returns an array of access points with the city set to `$city`.
Note that requests with the `?` query operator can be chained, e.g. `/api/v1/resource/?city=$city&zipcode=$zipcode`.

### GET /api/v1/resource?state=`$state`
Returns an array of access points with the state set to `$state`.
Note that requests with the `?` query operator can be chained, e.g. `/api/v1/resource/?city=$city&zipcode=$zipcode`.

### GET /api/v1/resource?country=`$country`
Returns an array of access points with the country set to `$country`.
Note that requests with the `?` query operator can be chained, e.g. `/api/v1/resource/?city=$city&zipcode=$zipcode`.

### GET /api/v1/resource?address=`$address`
Returns an array of access points with the address set to `$address`.
Note that requests with the `?` query operator can be chained, e.g. `/api/v1/resource/?city=$city&zipcode=$zipcode`.

### GET /api/v1/resource?zipcode=`$zipcode`
Returns an array of access points with the zipcode set to `$zipcode`.
Note that requests with the `?` query operator can be chained, e.g. `/api/v1/resource/?city=$city&zipcode=$zipcode`.

### POST/PUT /api/v1/resource

Sends a new access point object to the database.

The object to be send should have the following fields. Any additional fields will be ignored.

|  Field          | Value Type      | Description                                                      | Example                 |
|-----------------|-----------------|------------------------------------------------------------------|-------------------------|
| resource_name   | STRING          | The name of the access point.                                    | Halligan Hall           |
| city            | STRING          | The city in which the access point resides. Can be null.         | Medford                 |
| country         | STRING          | The country in which the access point resides.                   | /api/v1/user_account/1  |
| state           | STRING          | state in which the access point resides. Can be null.            | /api/v1/user_account/1  |
| address         | STRING          | The address at which the access point resides.                   | 161 College Ave         |
| zipcode         | INT             | The area code in which the access point resides.                 | 02155                   |
| created_by      | STRING          | The user who created this access point.                          | /api/v1/user_account/1  |
| modified_by     | STRING          | The user who last modified this access point.                    | /api/v1/user_account/1  |

The header of the HTTP request must match the format of the data being sent, and that format must be either JSON or XML. All fields above *must* be included. 

Fields will be checked for validity (e.g. zipcode) before being added to the database.

## Request

A request is an item connecting a user account to a new group of resources or a new card; this is the primary mode by which modification are made to cards. When a request is made, managers with appropriate clearance will be able to see and interact with the request and thereby accept or reject it from inside the CardControl system.

### GET /api/v1/request/`$id`

Returns the request with the given ID. 

|  Field          | Value Type      | Description                                                      | Example                 |
|-----------------|-----------------|------------------------------------------------------------------|-------------------------|
| user            | STRING          | The user account on whose behalf this request is being made.     | /api/v1/user_account/1  |
| new_access_points| STRING[]       | A list of access points to which the user requests access, in addition to current ones. | [/api/v1/access_point/1]|
| new_card        | STRING          | A reference to the card which the user wishes to make their active card | /api/v1/card/1 |
| feedback        | STRING          | The manager feedback on this request.                            | "Accepted."  |
| reason          | STRING          | The justification as to why this request should be accepted.     | "Have class there." |
| request_level   | INT             | The manager level needed to clear this request.                  | 2                   |
| status          | INT             | 0 == open, 1 == accepted, 2 == rejected                          | 0                   |
| created_at      | DATETIME        | The time at which the request was submitted                      | 2017-04-06T18:44:27.931607 |
| modified_at     | DATETIME        | The time at which the request was last modified                  | 2017-04-06T18:44:27.931607 |
| created_by      | STRING          | The user who created this access point.                          | /api/v1/user_account/1  |
| modified_by     | STRING          | The user who last modified this access point.                    | /api/v1/user_account/1  |
| id              | INT             | Has value `$id`.                                                 | 1                       |
| resource_uri    | STRING          | Has value '/api/v1/resource/`$id`'.                              | /api/v1/resource/1      |

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

### GET /api/v1/request/?user=`$user`
Returns an array of access points with the resource name set to `$user`.
Note that requests with the `?` query operator can be chained, e.g. `/api/v1/request/?status=$status&created_at=$created_at`.

### GET /api/v1/request/?request_level=`$request_level`
Returns an array of access points with the request_level set to `$request_level`.
Note that requests with the `?` query operator can be chained, e.g. `/api/v1/request/?status=$status&created_at=$created_at`.

### GET /api/v1/request/?status=`$status`
Returns an array of access points with the status set to `$status`.
Note that requests with the `?` query operator can be chained, e.g. `/api/v1/request/?status=$status&created_at=$created_at`.

### GET /api/v1/request/?modified_at=`$modified_at`
Returns an array of access points with the modified_at set to `$modified_at`.
Note that requests with the `?` query operator can be chained, e.g. `/api/v1/request/?status=$status&created_at=$created_at`.

### GET /api/v1/request/?created_at=`$created_at`
Returns an array of access points with the created_at set to `$created_at`.
Note that requests with the `?` query operator can be chained, e.g. `/api/v1/request/?status=$status&created_at=$created_at`.

### PUT/POST /api/v1/request` 


Sends a new access point object to the database.

The object to be send should have the following fields. Any additional fields will be ignored.

|  Field          | Value Type      | Description                                                      | Example                 |
|-----------------|-----------------|------------------------------------------------------------------|-------------------------|
| user            | STRING          | The user account on whose behalf this request is being made.     | /api/v1/user_account/1  |
| new_access_points| STRING[]       | A list of access points to which the user requests access, in addition to current ones. | [/api/v1/access_point/1]|
| new_card        | STRING          | A reference to the card which the user wishes to make their active card | /api/v1/card/1 |
| feedback        | STRING          | The manager feedback on this request.                            | "Accepted."  |
| reason          | STRING          | The justification as to why this request should be accepted.     | "Have class there." |
| request_level   | INT             | The manager level needed to clear this request.                  | 2                   |
| status          | INT             | 0 == open, 1 == accepted, 2 == rejected                          | 0                   |
| created_at      | DATETIME        | The time at which the request was submitted                      | 2017-04-06T18:44:27.931607 |
| modified_at     | DATETIME        | The time at which the request was last modified                  | 2017-04-06T18:44:27.931607 |
| created_by      | STRING          | The user who created this access point.                          | /api/v1/user_account/1  |
| modified_by     | STRING          | The user who last modified this access point.                    | /api/v1/user_account/1  |

The header of the HTTP request must match the format of the data being sent, and that format must be either JSON or XML. All fields above *must* be included. 

Fields will be checked for validity; for example, changing the status is not allowed if the user in question is not a manager.
