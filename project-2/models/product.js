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

const Product = class Product {

    constructor(title) {
        this.title = title;
    };

    save() {

        const p = path.join(rootDir, ".data", "products.json");

        fs.readFile(p, "utf8", (err, data) => {

            // @TODO: add sanitize check  for 'data' is accept 'string' only; so not get 'undefined'.

            let products = [];

            // @FIXME: the logic when get an 'error' should resolve; not throw the 'error'.
            // @TODO: if file doesn't exist you should create automatically and close it.
            if(err && !data) {
                console.log(err);
                // throw err;
            }
            else {
                products = JSON.parse(data);
            };

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

    static fetchAll() {

        // FIXME: create a callback to accept the 'length' of products, when
        // this method get call.
        const p = path.join(rootDir, ".data", "products.json");

        // FIXME: again you should close this file after read to clean your
        // event-loop, !!!make use to explicit when writing the code.
        fs.readFile(p, "utf8", (err, data) => {

            if (err && !data) {
                console.log(err);
                return [];
            };

            return JSON.parse(data);
        });
    };
};

module.exports = Product;


