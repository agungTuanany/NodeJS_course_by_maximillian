"use strict";

/*
 * A model for single entity from 'products'.
 *
 * Is a central place to organized, structured, manipulate your single entity
 * for products.
 *
 * @param: next() is reserved method on MongoDB
 * @param: new mongodb.ObjectId() is converting userId into a string

 * @NOTE: You could use @param: findOne() ensuring you just find one element; with
 * @param: findOne() you not need use @param: next() method.
 */

// Core Dependencies

// 3rd party Dependencies
const mongodb = require("mongodb");

// Internal Dependencies
const { getDb } = require("./../lib/database.js");

// Global variables
const ObjectId = mongodb.ObjectId;

class User {
    constructor(firstName, lastName, email, cart, id) {

        this.firstName = firstName;
        this.lastName  = lastName;
        this.email     = email;
        this.cart      = cart; // {items: []}
        this._id       = id;
    };

    save() {

        const db = getDb();
        return db.collection("users")
            .insertOne(this)
            .then(result => {

                console.log("=====> model user.js| succeeded create new user ",result)
            })
            .catch(err => console.log(err));
    };

    addToCart(product) {

        // const cartProduct = this.cart.items.findIndex(cartProductArray => {

        //     return cartProductArray._id === product._id;
        // });

        // Create new element on the fly
        // product.quantity = 1;

        // Check if 'cart' have property named 'quantity' in MongoDB documents.
        // If not just add on the fly new field named 'quantity'.
        const updatedCart = { items: [{ ...product, quantity: 1 }] };
        const db = getDb();

        return db.collection("users")
            .updateOne(
                { _id: new ObjectId(this._id) },
                { $set: { cart: updatedCart } } // overwrite the 'old cart' with 'new cart' value
            )
            .then(result => {

                console.log(result);
            })
            .catch(err => console.log(err));
    };

    static findById(userId) {

        const db = getDb();
        return db.collection("users")
            .findOne({ _id: new ObjectId(userId) })
            .then(user => {

                console.log("=====> model user.js| succeeded find user ", user);
                return user;
            })
            .catch(err => console.log(err));
    };
};

module.exports = User;
