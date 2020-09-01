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
    constructor(firstName, lastName, email) {

        this.firstName = firstName;
        this.lastName  = lastName;
        this.email     = email;
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

    static findById(userId) {

        // .findOne({ _id: new ObjectId(userId) })

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
