# Session & Cookies

## Table of Contents
1. [Module Introduction](#module-introduction)
2. [What is a Cookie](#what-is-a-cookie)
3. [What is Session](#what-is-session)

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
