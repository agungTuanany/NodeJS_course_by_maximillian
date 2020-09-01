"use strict";

/*
 * A model for single entity from 'products'.
 *
 * This is a central place to organized, structured, manipulate your single entity
 * for products.
 */

// Core Dependencies

// Internal Dependencies

// Global variables

const  { getDb }  = require("./../lib/database.js");

class Product {
    constructor(title, price, imageUrl, description) {

        this.title = title;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
    };

    save() {

        const db = getDb();
        return db.collection("products")
        // .insertOne({
        //     name: "lettuce",
        //     price: "20.04",
        // });
            .insertOne(this)
            .then(result => {
                console.log(result)
            })
            .catch(err => console.log(err));
    }
}


module.exports = Product;
