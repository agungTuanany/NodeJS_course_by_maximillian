# Session & Cookies

## Table of Contents
1. [Module Introduction](#module-introduction)
2. [What is a Cookie](#what-is-a-cookie)
3. [What is Session](#what-is-session)
5. [Initializing the Session Middleware](#initializing-the-session-middleware)
6. [Using the Session Middleware](#using-the-session-middleware)
7. [Using MongoDB to Store Session](#using-mongodb-to-store-session)

<br/>

## Module Introduction
<br/>

![chapter-13-1.gif](./images/gif/chapter-13-1.gif "Module Introduction")
<br/>

Enough about databases for now, let's stick to **storing** data and let dive
into some mechanisms of storing data in `memory` or event on the client-side (in
the browser). For that this chapter (module) we'll have a look at the `session`
and `cookies`.  Both is two important constructs or technologies in we
development in general which you can of course also use in NodeJS which you can
of course also use in NodeJS.

We'll have a look at what exactly **cookies** and **session** are? And then how
you can use both and how you typically use them.

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>

## What is a Cookie
<br/>

![chapter-13-2.gif](./images/gif/chapter-13-2.gif "What's Cookie")
<br/>

So what is cookie. Well here's our setup, we got a **user** using browser and we
got our **Server** where our NodeJS application runs. Now the **User** interacts
with the **frontend** with the `views` we render the **ejs** templating engine
in this course but of course I'm talking about **any** views you might be
rendering in your project with which ever templating engine or frontend
framework what you are using.

From inside that `view` let's say we have a form there to add a new `product` we
submit a **request** to our NodeJS server. Now that request requires us to store
some kind of data in the browser, let's say we're not working with the
`addproduct` page but let's say we have a **login** page and when the User logs
in, we want to store the information that the User is logged  in somewhere so
that when the User **reloads** the page and therefore technically a **new
request** is sent, we still have User information around, that the User is
logged in.

For that information we **send back** a **cookie** with the response we send
back upon the request. So the User submits the **login data** and we return
response which can be a **new view** to which we redirect to User, but we also
include our cookie and that cookie is simply is important to telling the User or
to storing that information that the User is **authenticated**.

We can sore that information in the browser (frontend), in the environment the
User interacts with and we can send information back with subsequent request to
include the cookie there to send the data we stored in the cookie like User
information that logged in to the server. So cookies are stored on the client
side.

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>

## What is Session
<br/>

![chapter-13-3.gif](./images/gif/chapter-13-3.gif "What's Session")
<br/>

What is Session? Well we have the same set up as Cookie, **User** using the
**frontend (views)** interacting with our **Server(NodeJS)** where we have our
node application code. We send a **Request** and we do **login** and again let's
assume we do send the valid credential there.

We're not validating them in this module(chapter) because I want to focus on
session and cookies.

SO instead of _storing_ the information that the User is authenticated in the
frontend which was a bad place as we learned, we'll **store it in the backend**
with so called Session; and a Session is a new **construct** which we haven't
used before.

With that I'm not meaning that we store it in the `request` because we already
saw that this will not work, and I also don't mean that we store it in some
_variable_ in our ExpressJS app because that would be **shared** across all
_Users_ and all _request_. We only want to share the information across all
_request_ of the same _User_ and that's really important, So that other Users
**can't see** your data, can't assume your role, can't tell the server that they
are authenticated, only you are authenticated.

For that we need to store it on the server, we'll start by storing it in
**memory** which is then pretty similar to storing in that variable, but
eventually we'll move to a different Session storage, the **database** and we
need one important piece of information. A client needs to tell the server to
which Session he belongs because Session will in the end just be an entry stored
in memory or stored in a database.

Now we're not matching this by IP address or anything like that because that is
a bit hard to maintain and can be faked and all that fun stuff. Instead we'll
using a Cookie where we still store the ID of the Session. Now obviously you can
still change that and assume a different ID if you want, but that will not work
like this, because actually the value we store will not be the ID but the
**hashed ID**, hashed with certain algorithm where only the server can confirm
that, if it has not been fiddled (manipulate) with, so that you didn't play
around with it and tried to create a different one.

So this will be a **secure** way because you basically store the ID in an
encrypted way where only the server is able to confirm that the stored Cookie
value relates to a certain ID in the database, and therefore we got a safe value
stored in the Cookie which you will not change it but assume you will not assume
a different Session. A Session can be matched and that Session can be then
contain the confidential data which you can't change from inside the browser,
that the idea here.

So **Session are stored on the server side. Cookie are on client side**.

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>

## Initializing the Session Middleware

To implement a session, we'll need another third party package with managing
Session. [express-session](https://github.com/expressjs/session) is the official
ExpressJS suite but not baked into ExpressJS itself. After installation we setup
Session-middleware:

[app.js](./../project-9/app.js)

```javascript
...
...

app.use(session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
}));

...
...
```

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>

## Using the Session Middleware

How do we use Session-middleware? We Used in
[auth.js](./../project-9/controllers/auth.js)

```javascript
...
...

const postLogin = (request, response, next) => {

    request.session.isLoggedIn = true;
    return response
        .status(301)
        .redirect("/")
};

...
...
```
<br/>

![chapter-13-4.gif](./images/gif/chapter-13-4.gif "Using the Session Middleware")
<br/>

In Cookies you will see **connect.sid** have column named **value** with some
strange string. The strange string is the **encrypted value**; And this is now
the Cookie, by default it's a _session cookie_ it will expired  when you close the
browser.

That **Session Cookie** will identified your User here, your running instance of
this website. You could say where you are browsing around, this will identify
you to the server and to this Session.

We can prove by log _request.sesion_ with getLogin() methods in
[auth.js](./../project-9/controllers/auth.js) controllers

```javascript
const getLogin = (request, response, next) => {

    // const isLoggedIn = request.get("Cookie")
    //     .split(";")[0]                          // Changes the [0] values as your cookies sequence
    //     .trim()
    //     .split("=")[0] === "true";

    // console.log("===> isLoggedIn:", isLoggedIn)

    console.log("===> request.session:", request);
    return response
        .status(200)
        .render("auth/login", {
            pageTitle: "Login",
            path: "/login",
            isAuthenticated: false
            // isAuthenticated: isLoggedIn
        });
};
```
![chapter-13-5.gif](./images/gif/chapter-13-5.gif "Using the Session Middleware")
<br/>

Now we have store the Session, we can go to different page and come back to
_login_ page we still in same Session cause we never leave the browser. All the
individual request from each other, totally separated and still we see
**loggedIn** Cookies is still have a value **true** because we still store the
Cookies in the Session on the server side by default, just in **memory** not in
database yet, and the Session is identified for this browser because we have
that Cookie.

This is how we can store data that persist (stick out) across request but not
across Users. That the power of using Session. It still needs a Cookies to
identify the User but the **sensitive information is stored on server**, we
can't modify it; And that of course will be super important for authentication;
And what we see above already is the **core mechanisms** behind authenticating
Users in the web; There are other techniques too for example when building
a **REST API**, something we'll come back later.

The explanation above is a core thing on how authentication generally work
especially when **rendering views** as we are doing it with EJS and this is what
we will build up on in the authentication section where we then also dive into
things like **validating credential**, **logging Users out** and fun stuff like
that.

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>

## Using MongoDB to Store Session

Now we can use the Session, the problem here is the Session is stored in
**memory**, and memory is not infinite resource. So for staging (development) is
fine but for a production server, this would be horrible because if you have
thousands or one hundred thousands of Users, your memory will quickly overflow
if you store all the information (Cookies and Session). You don't want to do
that. From **security** perspective it's also not ideal.

So we want store Session differently, and on the
[express-session](https://github.com/expressjs/session) documentation, you will
find a list of **session store** you can use and basically all kinds of
databases are supported. You could store in **files** though that might not give
you the best performance and we will use
[connect-mongodb-session](https://github.com/expressjs/session) package and
register.

So to setup the **MongoDB Store** we write on [app.js](./../project-9/app.js):

```javascript
...
...;

const session    = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

...
...;
// @TODO: move this credential into .env
// MongoDB Session
const MONGODB_URI = "mongodb://myDBReader:D1fficultP%40ssw0rd@mongodb0.example.com:27017/?authSource=admin"
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: "sessions"
});

...
...;

// @TODO: @param: secret move into .env
// Session
app.use(session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store        // Add another options
}));

...
...;
```
<br/>

![chapter-13-6.gif](./images/gif/chapter-13-6.gif "Using MongoDB to Store Sessions")
<br/>

This how Session are now **stored in database** and this is how you should store
them for production, use a real Session store, don't use the **memory** store
which is _less secure_ and which also is _less unlimited_ or which will reach
limits when more Users use you application.

With that Session are a powerful tool for storing data across request while
still scoping to a single user and not sharing the data across Users, because
now as you saw, different Users have different Sessions, but this is not a great
way mostly for managing authentication, but you could also store something like
the **shopping cart** in a session.

We are storing _shopping cart_ in a database which is also a decent (reasonable)
solution but you could store it in a Session and therefore indirectly in the
database I guess, In the Session database collection.

So in general, use a session for **any data that belongs to a User** that you
don't want to lose after every response you send and that should not be visible
to other Users.


**[⬆ back to top](#table-of-contents)**
<br/>
<br/>
