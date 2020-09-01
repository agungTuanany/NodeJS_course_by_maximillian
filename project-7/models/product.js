"use strict";

/*
 * A model for single entity from 'products'.
 *
 * This is a central place to organized, structured, manipulate your single entity
 * for products.
 *
 * Sat Aug 29 05:07:10 AM WIB 2020
 * @TODO: change all promise with async-await
 *
 * @param: this.id is optional arguments.
 * @param :#$et is reserved name in MongoDB
 */

// Core Dependencies

// 3rd party library
const mongodb = require("mongodb");

// Internal Dependencies
const  { getDb }  = require("./../lib/database.js");

// Global variables

class Product {
    constructor(title, price, imageUrl, description, id) {

        this.title = title;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this._id = id;
    };

    save() {
        const db = getDb();
        let dbOperation;

        if (this._id) {
            // update the product
            dbOperation = db.collection("products")
                .updateOne({
                    _id: new mongodb.ObjectId(this._id)
                }, {
                    $set: this
                    // or with robust way
                    // $set: {
                    //     title: this.title,
                    //     price: this.price,
                    //     imageUrl: this.imageUrl,
                    //     description: this.description
                    // }
                })
        }
        else {
            dbOperation = db.collection("products").insertOne(this);
        };

        return dbOperation
            .then(result => {
                console.log("============================> model product.js",result)
            })
            .catch(err => console.log(err));
    };

    static fetchAll() {

        const db = getDb();
        return db.collection("products")
            .find()
            .toArray()
            .then(products => {
                // console.log(products);
                return products;
            })
            .catch(err => console.log(err));
    };

    // Find single product
    static findById(prodId) {

        const db = getDb()
        return db.collection("products")
            .find({
                _id: new mongodb.ObjectId(prodId)
            })
            .next()
            .then(product => {
                console.log(product);
                return product;
            })
            .catch(err => console.log(err));
    };
};


module.exports = Product;
