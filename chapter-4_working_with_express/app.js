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

app.post("/product", (request, response, next) => {

    console.log("in '/product' middleware!");
    console.log(request.body);
    return response.redirect("/");
});

app.use("/", (request, response, next) => {

    console.log("In '/' middleware!");
    return response.send('<h1>Hello from Express!</h1>');
});

app.listen(8088);
