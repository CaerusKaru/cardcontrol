# Leg 5: 

## A RESTful Week:

It's been an eventful few weeks for Team 6. After pushing to production and fixing some architectural issues, we turned our eye to interfacing our now-public application with the outside world. For most software, interfaces between disparate components are handled via application programming interfaces, or APIs. An API is any form of controlled interface between a closed software system and any external services; in our case we need the ability to interface with our access control system through our front-end web application as well as through any external services and domain-specific utilities that are required by clients.

For this reason, for web services in general and CardControl especially, APIs form the core of the application. They are the layer between the storage and management of data and the user; they are the most compressed and precise way of retrieving the hydrated and formatted data that the application makes public. In particular, CardControl and other web applications make use of RESTful APIs. The acronym expands to "REpresentation State Transfer", and the idea is that if one wants to build an application which will scale readily to thousands or millions of users, the server cannot store any state for the client. The memory load would be too large, would not be scalable, and would have too much overhead. Instead, the client manages their state, and the server is stateless with regard to the client. For a less abstract formulation, many websites have an infinite scrolling feature; the state of how far along a page a user has scrolled is not and could not possibly be maintained for each user on the server, which is why when the page reloads, that state is usually cleared. 

In the case that some state should be preserved, for example if the user wants the website to save some information, we bring in the power of REST. The state which one machine posesses needs to be transfered to another machine, in most cases the server; instead of sending the state in full, with all of its methods, bells, whistles, and behaviors, we create a representation of the state, perhaps by serializing it in some way before transfering it; on the other machine, we maintain a distinct method of interpreting transfered state. This is representational state transfer. Therefore in the simplest format of the RESTful web: if we have one request to `GET /home.html` the request returns a representation of the `home` state. By then requesting to `GET /about.html`, the client undergoes a state transfer into a different state due to the passing of an additional representation. In this way each request transfers some representation of state back and forth between machines in such a way that no machine manages the state of another. 

# Our API

This kind of RESTful HTTP API is the foundation of most modern web applications, and CardControl is no different. In fact, from the first stages of our project we've had a RESTful API in place; we use it to link our web application to our backend processing and database. We chose to construct our API with Tastypie, a common extension to Django — it seemed a sensible choice, as it creates a fairly extensible API with all of the qualities we would want. We have an API endpoint with the structure `/api/v1/resource_name/`. We have a version number, our endpoints are automatically well-formatted with meaningful names, the action being performed e.g. GET, POST, PUT, is inferred from the HTTP verb being invoked. The package holds us to good, consistent API standards and was easy to work with.

We allow only GET, PUT, and POST requests to our API endpoints. Being an access control system, we must be very aware of who has access — our backend must implement careful access control for our access control. We have seven main endpoints, as follows:

| Endpoint      |
|---------------|
| card          |
| edited_card   |
| user_account  |
| access_point  |
| resource      |
| domain        |
| request       |

The edited_card and request endpoints are freely editable by users; users should be able to submit edits to their cards, and requests for new access, etc. However, we will need some authentication; users should only be able to view and modify these resources if they belong to that user, of course! Being able to view other peoples' access requests would be a massive security vulnerability. If the access control system grants access to anyone who knows their way around `curl`, the doors on campus may as well not have locks. 

The user_account objects store the account details of users, including their active ID card, buildings to which they have access, and their manager level if applicable. This would not be a good object to have openly editable and accessible. As such, with authentication, anyone should be able to create a single unpriveleged user account, but elevation of manager levels and any other modifications must require the user making the request to have a certain manager level themselves.

The access_point, resource, and domain endpoints are used in the creation of the relevant objects in the hierarchal location structure of points to which we are controlling access. These clearly should not be open to access or modification, but should be open to viewing. However within access point objects we maintain a list of users who have access to the building — this should not be public information, and should be stripped out of the API response unless the client making the call has authenticated as a manager.

Our API's thorough documentation is available through a link in the main navigation bar of our web application.

# A Cache 22


> It may seem strange to focus so heavily on naming, but as the old joke goes, it's one of the two remaining unsolved problems in computer science. The other being cache invalidation and off-by-one errors.

> — Varnish Documentation

Once we created our API, we turned our focus to the next level of scaling our product: once users have the ability to freely interact with our system, how do we ensure the system will scale? The first answer to this problem is caching. When is caching necessary? There is a fine line between caching in such a way that growing pains as the scope and scale of the service being offered expands, and dangerous premature optimization of a still-evolving API and web application. We decided to implement a system of fast caching, but we chose to make it flexible and layered, such that we can still tweak to support the changes and revisions in our application.

We've since created a robust structure of leveled caches with Varnish and Redis. Varnish is an enterprise service to cache HTTP responses in memory; it is compiled to C from a configuration file, and can be placed in front of any server to cache the configured responses. We placed it in front of our NGINX server in production, and found immediate and massive speedups. 

We then implemented a backup Redis cache in front of the backend, to cache the API responses directly. This gives us more configurability, in that we can store larger, less-frequently made responses in the slower but closer-to-the-backend Redis cache in order to free up space in the blazingly fast catch-all (cache-all?) Varnish cache.

Our empirical results are below. We used the loadtest tool to send a series of organized requests and collect the output (the tool can be installed through npm; documentation here: https://www.npmjs.com/package/loadtest)

```
===================================================================================
API Documentation Page (localhost dev server)
===================================================================================

◈▷ loadtest -n 100 -k http://localhost:6419/
[Sat Apr 08 2017 02:05:30 GMT-0400 (EDT)] INFO Percentage of the requests served within a certain time
[Sat Apr 08 2017 02:05:30 GMT-0400 (EDT)] INFO   50%      468 ms
[Sat Apr 08 2017 02:05:30 GMT-0400 (EDT)] INFO   90%      1099 ms
[Sat Apr 08 2017 02:05:30 GMT-0400 (EDT)] INFO   95%      1876 ms
[Sat Apr 08 2017 02:05:30 GMT-0400 (EDT)] INFO   99%      4056 ms
[Sat Apr 08 2017 02:05:30 GMT-0400 (EDT)] INFO  100%      4056 ms (longest request)

===================================================================================
API Documentation Page (unoptimized production)
===================================================================================

◈▷ loadtest -n 100 -k http://34.193.86.61/api
[Sun Apr 09 2017 16:43:53 GMT-0400 (EDT)] INFO Percentage of the requests served within a certain time
[Sun Apr 09 2017 16:43:53 GMT-0400 (EDT)] INFO   50%      342 ms
[Sun Apr 09 2017 16:43:53 GMT-0400 (EDT)] INFO   90%      523 ms
[Sun Apr 09 2017 16:43:53 GMT-0400 (EDT)] INFO   95%      544 ms
[Sun Apr 09 2017 16:43:53 GMT-0400 (EDT)] INFO   99%      627 ms
[Sun Apr 09 2017 16:43:53 GMT-0400 (EDT)] INFO  100%      627 ms (longest request)

===================================================================================
API Documentation Page (fully optimized production)
===================================================================================

◈▷ loadtest -n 100 -k http://34.193.86.61/api
[Sat Apr 08 2017 02:06:36 GMT-0400 (EDT)] INFO Percentage of the requests served within a certain time
[Sat Apr 08 2017 02:06:36 GMT-0400 (EDT)] INFO   50%      29 ms
[Sat Apr 08 2017 02:06:36 GMT-0400 (EDT)] INFO   90%      34 ms
[Sat Apr 08 2017 02:06:36 GMT-0400 (EDT)] INFO   95%      46 ms
[Sat Apr 08 2017 02:06:36 GMT-0400 (EDT)] INFO   99%      74 ms
[Sat Apr 08 2017 02:06:36 GMT-0400 (EDT)] INFO  100%      74 ms (longest request)

===================================================================================
Large API Call (unoptimized production)
===================================================================================

◈▷ loadtest -n 100 -k http://34.193.86.61/api/v1/domain/
[Sun Apr 09 2017 17:15:10 GMT-0400 (EDT)] INFO Percentage of the requests served within a certain time
[Sun Apr 09 2017 17:15:10 GMT-0400 (EDT)] INFO   50%      208 ms
[Sun Apr 09 2017 17:15:10 GMT-0400 (EDT)] INFO   90%      258 ms
[Sun Apr 09 2017 17:15:10 GMT-0400 (EDT)] INFO   95%      260 ms
[Sun Apr 09 2017 17:15:10 GMT-0400 (EDT)] INFO   99%      511 ms
[Sun Apr 09 2017 17:15:10 GMT-0400 (EDT)] INFO  100%      511 ms (longest request)

===================================================================================
Large API Call (fully optimized production)
===================================================================================

◈▷ loadtest -n 100 -k http://34.193.86.61/api/v1/domain/
[Sun Apr 09 2017 17:16:27 GMT-0400 (EDT)] INFO Percentage of the requests served within a certain time
[Sun Apr 09 2017 17:16:27 GMT-0400 (EDT)] INFO   50%      15 ms
[Sun Apr 09 2017 17:16:27 GMT-0400 (EDT)] INFO   90%      19 ms
[Sun Apr 09 2017 17:16:27 GMT-0400 (EDT)] INFO   95%      20 ms
[Sun Apr 09 2017 17:16:27 GMT-0400 (EDT)] INFO   99%      198 ms
[Sun Apr 09 2017 17:16:27 GMT-0400 (EDT)] INFO  100%      198 ms (longest request)


===================================================================================
Frontend Angular Page (unoptimized production)
===================================================================================

◈▷ loadtest -n 100 -k http://34.193.86.61
[Sun Apr 09 2017 16:35:39 GMT-0400 (EDT)] INFO Percentage of the requests served within a certain time
[Sun Apr 09 2017 16:35:39 GMT-0400 (EDT)] INFO   50%      15 ms
[Sun Apr 09 2017 16:35:39 GMT-0400 (EDT)] INFO   90%      19 ms
[Sun Apr 09 2017 16:35:39 GMT-0400 (EDT)] INFO   95%      22 ms
[Sun Apr 09 2017 16:35:39 GMT-0400 (EDT)] INFO   99%      44 ms
[Sun Apr 09 2017 16:35:39 GMT-0400 (EDT)] INFO  100%      44 ms (longest request)

===================================================================================
Frontend Angular Page (fully optimized production)
===================================================================================

◈▷ loadtest -n 100 -k http://34.193.86.61
[Thu Apr 13 2017 02:09:22 GMT-0400 (EDT)] INFO Percentage of the requests served within a certain time
[Thu Apr 13 2017 02:09:22 GMT-0400 (EDT)] INFO   50%      14 ms
[Thu Apr 13 2017 02:09:22 GMT-0400 (EDT)] INFO   90%      19 ms
[Thu Apr 13 2017 02:09:22 GMT-0400 (EDT)] INFO   95%      20 ms
[Thu Apr 13 2017 02:09:22 GMT-0400 (EDT)] INFO   99%      42 ms
[Thu Apr 13 2017 02:09:22 GMT-0400 (EDT)] INFO  100%      42 ms (longest request)

```
