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
const Cart = require("./cart.js");

// Global variables
const p = path.join(rootDir, ".data", "products.json");

// Helpers function
const _getProductsFromFile = (callback) => {

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

    constructor(id, title, imageUrl, price, description) {
        this.id          = id;
        this.title       = title;
        this.imageUrl    = imageUrl;
        this.description = description;
        this.price       = price;
    };

    save() {

        //@TODO: 'id' should keep in JSON as 'number'
        _getProductsFromFile(products => {

            // Create 'id' for product
            if (!this.id) {
                this.id = Math.random().toString();

                products.push(this);
                fs.writeFile(p, JSON.stringify(products, null, 4), (err, data) => {

                    if (err && data) {
                        console.log(err);
                    };
                });
            }
            // Edit the product
            else {
                const existingProductIndex = products.findIndex(product => product.id === this.id);
                const updatedProducts = [...products];

                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts, null, 4), (err, data) => {

                    if (err && data) {
                        console.log(err);
                    };
                });
            };
        });
    };

    static deleteById(id) {

        _getProductsFromFile(products => {

            const product = products.find(product => product.id === id);
            // const productIndex = products.findIndex(product => product.id === id);
            const updatedProducts = products.filter(product => product.id !== id);

            fs.writeFile(p, JSON.stringify(updatedProducts, null, 4), (err, data) => {

                if (err && data) {
                    console.log(err);
                }
                else {
                    Cart.deleteProduct(id, product.price);
                    // console.log(data);
                };
            });
        });
    };

    static fetchAll(callback) {

        _getProductsFromFile(callback);
    };

    static findById(id, callback) {

        _getProductsFromFile(products => {

            const product = products.find(prod => prod.id === id);

            // Executed synchronously
            callback(product);
        });
    };
};

module.exports = Product;
