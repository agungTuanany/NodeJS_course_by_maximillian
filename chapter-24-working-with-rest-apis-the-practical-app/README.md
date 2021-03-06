# Working with REST APIs - The Practical Application

## Table of Contents

1. [Module Introduction](#module-introduction)
2. [REST API and The Rest of the course](#rest-api-and-the-rest-of-the-course)
3. [How Authentication Works on REST API](#how-authentication-works-on-rest-api)
4. [Module Summary](#module-summary)


<br/>

## Module Introduction
<br/>

![chapter-24-1.gif](./images/gif/chapter-24-1.gif "Module introduction")
<br/>

So, it's time to dive deeper into your REST API and build a complete project or
a complete backend-forth project as REST API; And in this project we'll have
a look a things like _authentication_ and other interesting things like _image
upload_ and so on.

What's in this module in detail, we'll plain our REST API, or I'll show you for
which you'll need want and will then build it together of course.

In detail, we'll implement all the CRUD operation to our project needs. So
_creating_, _reading_, _updating_ and _deleting_ items in a database and so on.
That's what we'll do here, we'll define all the REST API Endpoints for this and
so on.

We'll add validation on the server-side to make sure that only valid data gets
stored in our database.

We'll add image upload, so that we still can store images even though we're not
rendering views anymore.

Finally we'll dive into authentication, which will be very important and very
interesting too.

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>

## REST API and The Rest of the course
<br/>

![chapter-24-2.gif](./images/gif/chapter-24-2.gif "Rest and the rest of the course")
<br/>

Before we start working on the project, let me quickly have a look at REST API's
and the other knowledge you gained through out the course, is that now all
redundant. We learn about things like _setting up our NodeJS and  ExpressJS
apps_, like _routing_, _handling request-response_, _request validation_,
_database communication_, _file handling_, _uploads - downloads_, _session and
cookies_, and _authentication_.

Above all some big topics we covered for the course. Now how do we have to
adjust our knowledge? Now we build a RESTFUL API instead of a view based
application.

Well regarding the general setup, we already saw that in the last
module there are no changes we need  to do. We still setup our normal node and
express server.

Regarding the routing we also have no significant changes. We just use more HTTP
methods, more HTTP works now, that's the only different.

For handling request and responses that you've already learn. Now we work with
JSON data `.json()` instead of views. So that is a difference, we render no
views anymore. We have no views folder anymore, we don't use EJS, Handlerbars
or anything like that, instead we only exchange data; so there's a change, but
as you learned in the last module, this is also not too hard to implement.

Now, if you want to add validation for incoming request data, then we'll not
have to change anything. We still can add validation, for example with
`express-validator` which we used in the validation module of this course; and
the way we use it, and the logic behind it, does not change a single bit.

For database communication; So working with database, be that SQL or NoSQL
database also does not change. This happen on the server-side, in a controller
action typically, and the logic we write there, the code we write there is not
affected by the data we change, or by the fact whether we render a view or if
we send around JSON data.

When we talk about file uploads, downloads and so on, there's also not much to
changes. On the server-side, nothing changes actually, on the client-side the
logic changes a little bit, and I will show you how we can implement file
upload; and of course also serving files in this module.

For session and cookies, there we have changes, because we'll not use session
and cookies anymore with REST API; The reason for that simply is that you
learned about these RESTFUL principles, or REST API principles, and one of them
was, that each request is treated separately. It is looked at independently from
previous requests, so we have no connection between the client and the server.
WE have no shared connection history to be precise; And therefore we managed no
session on the server, because the REST API does not care about the clients, or
whether that client connected to API before.

Therefore authentication will also have to change. We'll use a different
authentication approach, and I'll show you which approach does this, and how to
implement it in this module too.

Overall there are not too many changes. Some changes, the biggest changes are
related to _sessions_, and they are for _authentication_, and I'll show you how
to implement them, but the rest will still work the same you learn it; And for
all the knowledge you gained through the Course, is of course everything but
redundant, it's still super important.

With that, let's dive in, let's see which project will be work on, and how we
can work on it.

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>

## How Authentication Works on REST API
<br/>

![chapter-24-3.gif](./images/gif/chapter-24-3.gif "How authentication works on REST API")
<br/>

How does authentication work in REST API? Well, obviously we still have our
client and server; And the client sends authentication data to the server; So
the `email` and `password`, let's say. In the past we then would have checked
data on the server; And if it's valid, we would have _established a session_. _We
don't use a session anymore, because RESTFUL API's are stateless_. They don't
care about the client.

You learned about that strict decoupling of server and client and every request
should be treated standalone; That means, every request should have all the data
it needs to authenticate itself. With a session the server needs to store data
about the client, the server then stores that a client is authenticated, and
that's just not how REST API is work; The server will not store anything about
any client; So we don't store session on REST API, and therefore this approach
will not be used anymore.

Obviously we will still validate the input on the server we'll still check for
the validity of the email-password combination; But then instead, we return as
so-called **_token_** to the client, that token will be generated on the server
and will hold some information which can only be validated by the server, and
this token will then be stored in the client, so they're in storage in the
browser, there are specific storage mechanisms for this, and the client can then
attach this token to every subsequent request it send to the server.

So this _stored token_ and attached to every request that targets a resource on
the server which requires authentication that token can only be validated by the
server, which created on token; And if you change that token on the frontend or
you try to create it to fake that you are authenticated, that will be detected,
because the server used a certain algorithm for generating the token, which you
can't fake because you don't know it or you don't know the private key you use
by that server for generating the token to be precise.

### What's that Token?
<br/>

![chapter-24-4.gif](./images/gif/chapter-24-4.gif "What is that token")
<br/>

The token contains **_JSON data_** or JavaScript data, and the end plus
**_signature_**, which as I mentioned is generated on the server with a special
private key which is only stored on the server, and this give us a so-called
_JSON WEB Token_ (JWT), this JWT is then returned to the client and the
signature as I explained can only be verified by a server; So _you can't edit or
create the token on the client_; Well you can, but the server will detect this
and will treat the token as invalid.

This is how we generate the token or how we do authentication and REST API. We
have the token, which can be checked by the server, but which does not to be
stored on the server, and this give us an elegant way of authenticating request
in a REST API world.

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>

## Module Summary
<br/>

![chapter-24-5.gif](./images/gif/chapter-24-5.gif "Module summary")
<br/>

That's it for this module, you'll learn that when moving from the _classic
NodeJS application_ which I don't mean in the sense of how you built it in the
past; So simply just an application where you rendered using the server, that is
a classic application, because that's what we started with this course.

So, if you move from such a NodeJS application to REST API, you'll learn that
most of the server-side does not change. You work with _validation files_, and
so on, in exactly the same way as you did with the classic approach, only
request and response data changed, just because there you send JSON data, you
don't render any views.

You also got more to the HTTP methods available, which you can use to construct
your API Endpoints.

The most _important take away_ is, that the REST API server does not care about
the client. The _request are handled in isolation_; So, every request is treated
as if would arrive for the first time. So we don't use _session_, the REST API
server does not store any sessions, it does not store any client data.

Now, that has important _implications for authentication_, due to no session
being used, the authentication works differently. Each request needs to be able
to send some piece of data, that proves the request is authenticated; and that's
this JSON Web Token (JWT), which we generated and worked with in this module.

JWT is a common way of storing some authentication information in a token
a piece of data which you send to the client, which you store on the client, and
which then gets attached to every outgoing request to a protected resources.

JWT are assigned by the server, and only the server can validate them by using
a private key, which is only known to the server; hence you can fake or
manipulate tokens on the client, and that's it for this module.

We now had a detailed look at building REST API; A common form of NodeJS
application which you need a loot of scenarios and now you have already a very
broad tool set, which allows you to build extremely versatile and powerful
NodeJS application.

We're still not done with the course though, there's more to come.

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>
