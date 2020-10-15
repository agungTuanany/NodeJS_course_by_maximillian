# Understanding Asynchronous Request

## Table of Contents
1. [Module Introduction](#module-introduction)
2. [What are Asynchronous Request](#what-are-asynchronous-request)

<br/>

## Module Introduction

Thus far in this project we build, we always had a look at a particular kind of
_request_ and _response_. The _request was always_ sent form our browser, when
we submitted a form or entered a URL or clicked a link and the _response always_
either a _redirect_ or a new HTML page.  That can take you very far, but
sometimes you get _some work request that will only happen behind the scene_.
Means you don't want to get back to reload HTML page, you only want to exchange
some data with the server, for example; And I'll show you what I mean and how
this work in this module.

We'll have a look at _what asynchronous JavaScript request are?_ Why we should
use them? And how we will use them.

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>

## What are Asynchronous Request
<br/>

![chapter-21-1.gif](./images/gif/chapter-21-1.gif)
<br/>

We have our _client_ (browser), our _server_ (NodeJS apps) that's the setup we
had for entire this course; And this is the setup you have with any web or even
mobile project that you built these days; You have your backend and you have
your frontend.

Typically you send a _request_ from your client to the server; And you get back
a _response_; As I mentioned thus far in this of course the response always as
_HTML page_ or _redirect_ to another route, that return HTML page.

There's nothing wrong with that, but there are a **_task_** where you don't want
to _reload the page_ for example, _delete item_; And actually in modern web
application the portion that happens behind the scenes is grows. Since we can do
a lot with JavaScript in the browser where we never need to fetch a new HTML
page; But where we constantly change the existing page as is it faster than
loading a new one; But that's something I'll cover in the RESTfull API module.

The idea behind the _asynchronous request_ is that you do send the request but
that request typically contains just some data in a special format named JSON
and that data is sent to the server to certain URL or a route excepted by the
server; So that logic doesn't change. The server can do whatever he want to do
with that request; And then we return the response; And that response all
returned, behind the scenes, it's not a new HTML page that needs to be rendered.
It's instead again just some data in that JSON format.

That's how client can communicate through JavaScript. So through client-side
JavaScript and the server-side logic without reloading or rebuilding the page,
without exchanging a new HTML page and that allows you to do some work behind
the scenes without interrupting the user flow without reloading the page.

Let's have look at how that would work in this module.

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>
