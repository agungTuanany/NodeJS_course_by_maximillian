# Chapter-3 Understanding The Basic

## Table of Contents
1. [How The Web Works](#how-the-web-works)
2. [NodeJS Program Lifecycle](#nodejs-program-lifecycle)
3. [Understanding Request](#understanding-request)
4. [Sending Response](#sending-response)
5. [Routing Request](#routing-request)
6. [Redirecting Request](#redirecting-request)



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

A standardized Protocol to `request` and `response` transmission of
communicating.

A correct handle a `request` and send back a `response` the browser can work
with and there we simply define or it is defined how a valid request looks like
and how the data should be transferred from browser to server and the other way
around.

HTTPS is simply as same with SSL encryption turned on where all the data that is
**transmitted** is actually encrypted so that if anyone is spoofing your
connection, they can't read your data.

### What is headers

Is some meta information which is attached to `request` and `response`
describing what's inside of data that come from your server or API.

### What is event driven

Is programming paradigm in which the flow of the program is determined by events
such as **user action** (mouse clicks, key presses), sensor output, or messages
from other threads.

Event driven is the dominant paradigm used in graphical user interface and ohter
application (e.g, JavaScript web application) that are centered on performing
certain actions in response to user input.

In an `event driven` application, there is generally a **main loop** that
listens for events, and then triggers a callback function when one of those
event detected.

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>

## NodeJS Program Lifecycle
<br/>

![chapter-3-2.gif](images/gif/chapter-3-2.gif "NodeJS program lifecycle")
<br/>

We execute [main.js](./app.js) and this essentially `started` the script where
NodeJS went through the entire file  `Parse code`, `Registered the variables
functions`.

Then something important happened, we never **left** that program. The reason
for this is an important concept in NodeJS called `event-loop`, this is
basically a loop process which is managed by NodeJS which keeps on running as
there is work to do. It keeps on running as log as there are `event listenrers`
registered and one `event listener` we did register and we never unregistered is
that **incoming** request listener we passed or we setup with the help
create server.

```javascript
"use strict";
const http = require("http");

const server = http.createServer((request, response) => {

    console.log(request);
});
```

We passed the function create server and that basically an ongoing `event
listener`; one we didn't unregister from and we shouldn't because our server
should of course **stay up and running**.

Our code `Node application` basically is managed by this `event loop`, NodeJS
uses such `event driven` approach for all kind of stuff; not just for managing
server, for access a databases, etc.

NodeJS use this pattern because it actually execute **single threaded**
JavaScript. So the entire Node process basically uses one `thread`on our
computer it's running on.

Now as you might guess if we create a server with NodeJS, it should of course be
able to handle multiple, thousand or more of incoming `request`, and if it would
always **pause** and then do something with that `request`, this would not be
that great.

Hence it uses this `event loop` concept where in the end it always keep on
running and just executes when a certain event occurs. So that in general it's
always available.

Whilst this might still sound like OK, but if there's more then one event
incoming request, it needs to handle two events, well it is super fast in
handling these requests and actually behind the scenes, it does some
`multi-threading` by leveraging the OS.

But this `event loop` is a core thing you have to keep in mind; that NodeJS
basically has an `ongoing loop` as long as there are `listeners` and
`createServer()` create a `listener` which never stops.

```javascript
"use strict";
const http = require("http");

const server = http.createServer((request, response) => {

    console.log(request);
    process.exit();         // added
});

sever.listen(8088);
```

If you eventually were to unregister, you can do this by `process.exit()` it would
end all process. The server is still running and `createServer()` function never executed
cause had no **incoming** request yet.  But if we reload `localhost:8088` it's
still log the `request` but then our `server` has quit the `createServer()`
function. Typically you don't call `process.exit()` because you don't want to quit
your server, if it quit people will not be able to reach your webpage anymore.
But this is important for understanding; `process.exit()` basically **hard
exited** `event loop` and therefore the program shut down because there was no
more work to do, NodeJS saw that there's no more work to do, an basically close
the program and gave control back to terminal.

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>

## Understanding Request

There's quite interesting on `request` object, but
there are only a few important fields as developer typically need. The first
important or interesting field is the `request.url`, `request.method`
`request.headers`

```javascript
"use strict";
const http = require("http");


const server = http.createServer((request, response) => {

    console.log("=======================================================");
    console.log("URL:", request.url);
    console.log("=======================================================");
    console.log("METHOD:", request.method);
    console.log("=======================================================");
    console.log("HEADERS:", request.headers)
    process.exit();
});

server.listen(8088);


=======================================================
URL: /
=======================================================
METHOD: GET
=======================================================
HEADERS: {
  host: 'localhost:8088',
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'accept-language': 'en-US,en;q=0.5',
  'accept-encoding': 'gzip, deflate',
  connection: 'keep-alive',
  cookie: 'io=qgIo3ExwAF8lrxvmAAAA',
  'upgrade-insecure-requests': '1'
}
```

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>

## Sending Response

```javascript
"use strict"
const http = require("http");


const server = http.createServer((request, response) => {

   response.setHeader("Content-Type", "text/html");
   response.write(`
       <html lang="en">
           <head>
               <title>My firts Page</title>
           </head>
           <body>
               <h1>Hello from Node.JS server!</h1>
           </body>
       </html>
       `);

   response.end();

   console.log("=================================");
   console.log("RESPONSE HEADERS:", response._header);
   console.log("=================================");
   console.log("REQUEST HEADERS:", request.headers);
   console.log("=================================");

});

server.listen(8088);


=================================
RESPONSE HEADERS: HTTP/1.1 200 OK
Content-Type: text/html
Date: Fri, 31 Jul 2020 13:22:16 GMT
Connection: keep-alive
Transfer-Encoding: chunked

=================================
REQUEST HEADERS: {
  host: 'localhost:8088',
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'accept-language': 'en-US,en;q=0.5',
  'accept-encoding': 'gzip, deflate',
  connection: 'keep-alive',
  cookie: 'io=qgIo3ExwAF8lrxvmAAAA',
  'upgrade-insecure-requests': '1',
  'cache-control': 'max-age=0'
}
=================================
```

**[⬆ back to top](#table-of-contents)**
<br />
<br />

## Routing Request
<br />

![chapter3.3.gif](./images/gif/chapter-3-3.gif "Routing request")

```javascript
"use strict";
const http = require("http");


const server = http.createServer((request, response) => {

    const url = request.url;

    if (url === "/") {
        response.setHeader("Content-Type", "text/html");
        response.write(`
            <html lang="en">
                <head>
                    <title>Enter Message</title>
                </head>
                <body>
                    <form action="/message" method="POST">
                        <input type="text" name="message" placeholder="write some data...">
                        <button type="submit">submit</button>
                    </form>
                </body>
            </html>
        `);
        return response.end(); // It set cause we should not call any response.write() or response.setHeader() after.
    };

    response.setHeader("Content-Type", "text/html");
    response.write(`
       <html lang="en">
           <head>
               <title>My firts Page</title>
           </head>
           <body>
               <h1>Hello from Node.JS server!</h1>
           </body>
       </html>
   `);

    response.end();
});

server.listen(8088);
```

**[⬆ back to top](#table-of-contents)**
<br />
<br />

## Redirecting Request
<br />

![chapter-3-4.gif](./images/gif/chapter-3-4.gif "Redirecting request")

```javascript
"use strict";

const http = require("http");
const fs   = require("fs");


const server = http.createServer((request, response) => {

    const url = request.url;
    const method = request.method;

    if (url === "/") {
        response.setHeader("Content-Type", "text/html")
        response.write(`
            <html lang="en">
                <head>
                    <title>Enter Message</title>
                </head>
                <body>
                    <form action="/message" method="POST">
                        <input type="text" name="message" placeholder="write some data...">
                        <button type="submit">submit</button>
                    </form>
                </body>
            </html>
        `);
        return response.end(); // It set cause we should not call any response.write() or response.setHeader() after.
    };

    if (url === "/message" && method === "POST") {

        fs.writeFileSync("message.txt", "DUMMY");
        response.statusCode = 302; // Redirection
        response.setHeader("location", "/");

        return response.end()


    };

    response.setHeader("Content-Type", "text/html");
    response.write(`
       <html lang="en">
           <head>
               <title>My firts Page</title>
           </head>
           <body>
               <h1>Hello from Node.JS server!</h1>
           </body>
       </html>
   `);

    response.end();

    // console.log("=================================")
    // console.log("RESPONSE HEADERS:", response._header)
    // console.log("=================================")
    // console.log("REQUEST HEADERS:", request.headers)
    // console.log("=================================")
});

server.listen(8088);
```


