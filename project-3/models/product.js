"use strict";

/*
 * A model for single entity from 'products'.
 *
 * Is a central place to organized, structured, manipulate your single entity
 * for products.
 */

// Core Dependencies
const fs = require("fs");
const path = require("path");

// Internal Dependencies
const rootDir = require("./../lib/path.js");

// Global variables
const p = path.join(rootDir, ".data", "products.json");

// Helpers function
const _getProductsFromFile = (callback) => {

    // FIXME: again you should close this file after read to clean your
    // event-loop, !!!make use to explicit when writing the code.
    fs.readFile(p, "utf8", (err, data) => {

        // Sanitize check cause I'm not use typescript
        data = typeof(data) ===  "string" && data.trim().length > 0 ? data : false;

        if (err && !data) {
            console.log(err);
            callback([]);
            return;
        };

        return callback(JSON.parse(data));
    });
};

const Product = class Product {

    constructor(title) {
        this.title = title;
    };

    save() {

        _getProductsFromFile(products => {

            products.push(this);

            fs.writeFile(p, JSON.stringify(products, null, 4), (err, data) => {

                // @FIXME: after you write a file you should `close` the file. So
                // not looping around in event-loop in future. Hint: use fs.close.
                if (err && data) {
                    console.log(err);
                };
            });
        });
    };

    static fetchAll(callback) {

        _getProductsFromFile(callback);
    };
};

module.exports = Product;
