"use strict";

/*
 * A model for single entity from 'products'.
 *
 * This is a central place to organized, structured, manipulate your single entity
 * for products.
 *
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
            .insertOne(this)
            .then(result => {
                console.log(result)
            })
            .catch(err => console.log(err));
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products')
            .find()
            .toArray()
            .then(products => {
                console.log(products);
                return products;
            })
            .catch(err => console.log(err));
    };
};


module.exports = Product;

/*
 * @param: .find(), is not immediately return a promise, instead it return
 * so-called "cursor". Cursor is an object provided by MongoDB which allow to go
 * through documents elements step by step because theoretically and
 * a collection find() could of course return of millions of documents, and you
 * don't want to transfer them over to wire all at once.
 *
 */
