# Chapter-3 Understanding The Basic

## Table of Contents
1. [How The Web Works](#how-the-web-works)




## How The Web Works
<br/>

![chapter-3-1.gif](images/gif/chapter-3-1.gif "How the web works")
<br/>

We get a `user/client` surfing internet, and visiting a webpage and submitting
a **form**. As user interact with webpages `http://my-page.com` what happens
behind the scenes is actually the browser reaches out to some **domain name
server** to lookup that domain up; because the domain is not really the address
of your server, it's basically an encoded human readable version of that
address. Your server itself has just an IP address. In simple word you enter
a url and it will lead to some server.

The browser therefore sends a `request` to server with that given IP address
belonging to that domain.

Here the interest thing happen, you write the `code` that spins up server
which is able to handle the incoming request and do something with it.

Your `code` handling `user input validation`, communicating with the `database`
maybe runs on a separate database server, but which you typically reach out to
from your backend (server side), so your server side code.

Once you're code done with handling request, your `code` send back a `response`
to the webpage (client side); This `response` can be some HTML text. Some HTML
code which is then handled by the client but it could also be some other kind
of data like a file some `json` or `xml` data.

The `response` is more than just the content, a `response` and `request` also
has `headers`.

### What is HTTP, HTTPS

A standardized



### What is headers

Is some meta information which is attached to `request` and `response`
describing what's inside of data that come from your server or API.

