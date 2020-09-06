# Session & Cookies

## Table of Contents
1. [Module Introduction](#module-introduction)
2. [What is a Cookie](#what-is-a-cookie)

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
