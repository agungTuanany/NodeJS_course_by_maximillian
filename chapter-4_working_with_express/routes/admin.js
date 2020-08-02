"use strict";

/*
 * A router for admin | as system administrator
 *
 */

// 3rd party Dependencies
const express = require("express");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", (request, response, next) => {

    console.log("In '/admin/add-product' admin middleware!");
    return response
        .status(200)
        .send(`
            <html lang="en">
                <body>
                    <h1>The Add-Product page</h1>

                    <form action="/admin/add-product" method="POST">
                        <input type="text" name="title" />
                        <button type="submit">Add Product</button>
                    </form>
                </bodym
            </html>
    `);
});

// /admin/add-product => POST
router.post("/add-product", (request, response, next) => {

    console.log("in '/admin/product' admin middleware!");
    console.log(request.body);
    return response
        .status(304)
        .redirect("/");
});

module.exports = router;
