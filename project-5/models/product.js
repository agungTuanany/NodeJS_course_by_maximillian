"use strict";

/*
 * A model for single entity from 'products'.
 *
 * Is a central place to organized, structured, manipulate your single entity
 * for products.
 */

// Core Dependencies

// Internal Dependencies
const db = require("../lib/database.js");
const Cart = require("./cart.js");

// Global variables


const Product = class Product {

    constructor(id, title, imageUrl, price, description) {
        this.id          = id;
        this.title       = title;
        this.imageUrl    = imageUrl;
        this.description = description;
        this.price       = price;
    };

    save() {
    };

    static deleteById(id) {
    };

    static fetchAll() {

        return db.execute("SELECT * FROM product")
    };

    static findById(id, callback) {
    };
};

module.exports = Product;
