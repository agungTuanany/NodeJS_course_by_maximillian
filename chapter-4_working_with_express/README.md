# Chapter-4 Working With ExpressJS

## Table of Contents
1. [Adding Middleware](#adding-middleware)
2. [Parsing Incoming Request](#parsing-incoming-request)

## Adding Middleware
<br />

![chapter-4-1.png](./images/chapter-4-1.png "All about Middleware")

ExpressJS is all about `middleware` as diagram above. Instead of just having one
`request` handler, you will have a possibility of hooking (connect) in multiple
functions which the `request` will go through until you send a `response`.

`middleware` allows developer to split the code into multiple blocks or pieces;
instead of having one huge function that does everything.

`middleware` is pluggable nature of express, where developer can easily add
other third party packages; which simply happen to give developer such
`middleware` functions that can plug into ExpressJS and add certain
functionalities.

This is a **core** concept of ExpressJS.

### What is Middleware

Is mean that an incoming `request` is automatically funneled (distributed)
through a bunch of functions.

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>

## Parsing Incoming Request

NOTE: middleware always **read** code from **top** to **bottom**

```javascript
"use strict";

// Core Dependencies
//...

// 3rd party Dependencies
const express = require("express");
const bodyParser = require("body-parser");

// Internal Dependencies
//...

const app = express();

// Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/add-product", (request, response, next) => {

    console.log("In '/add-product' middleware!");
    return response.send(`
        <html lang="en">
            <body>
                <h1>The Add-Product page</h1>

                <form action="/product" method="POST">
                    <input type="text" name="title" />
                    <button type="submit">Add Product</button>
                </form>
            </bodym
        </html>
    `);
});

app.use("/product", (request, response, next) => {

    console.log("in '/product' middleware!");
    console.log(request.body);
    return response.redirect("/");
});

app.use("/", (request, response, next) => {

    console.log("In '/' middleware!");
    return response.send('<h1>Hello from Express!</h1>');
});

app.listen(8088);

// localhost:8080/add-product
// Result from server
In '/add-product' middleware!
in '/product' middleware!
[Object: null prototype] { title: 'charger'  }
In '/' middleware!
```

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>
