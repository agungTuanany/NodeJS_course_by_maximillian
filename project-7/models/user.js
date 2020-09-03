"use strict";

/*
 * A model for single entity from 'user'.
 *
 * Is a central place to organized, structured, manipulate your single entity
 * for user.
 *
 * @param: next() is reserved method in MongoDB
 * @param: new mongodb.ObjectId() is converting userId into a string
 * @param: $in: reserved method in MongoDB
 *
 * @NOTE: You could use @param: findOne(), ensure you just search only one element;
 * with @param: findOne() you do not need use @param: next() method cause
 * @param: findOne() not giving a "cursor" but immediately return element.
 *
 * @NOTE: <embedded relation logic>:
 * The information from @param: getCart() may changing because if it should
 * change, for 'orders' we need only a snapshot, if the 'price' of 'product'
 * changes that doesn't affect the 'past order'.  So we would not want to update
 * the 'price' even the 'product' document are changed. The 'product' data might
 * be duplicate but it doesn't need to change in the 'orders' collection because
 * we only want to snapshot.
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

                console.log("===> model user.js| succeeded create new user ",result);
            })
            .catch(err => console.log(err));
    };

    addToCart(product) {

        const cartProductIndex = this.cart.items.findIndex(cartProductArray => {

            // @NOTE: @param: toString() is to ensure that every updatd Cart is
            // only work in string, as in MongoDB is not exactly 'type of string'
            return cartProductArray.productId.toString() === product._id.toString();
        });

        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];

        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        }
        else {
            updatedCartItems.push({
                productId: new ObjectId(product._id),
                quantity: newQuantity
            });
        };

        const updatedCart = { items: updatedCartItems };
        const db = getDb();

        return db.collection("users")
            .updateOne(
                { _id: new ObjectId(this._id) },
                { $set: { cart: updatedCart } } // overwrite the 'old cart' with 'new cart' value
            )
            .then(result => {

                // console.log("===> addToCart:", result);
                return result;
            })
            .catch(err => console.log(err));
    };

    getCart() {

        const db = getDb();
        const productIds = this.cart.items.map(i => i.productId);

        return db.collection("products")
            .find({
                _id: { $in: productIds }
            })
            .toArray()
            .then(products => {

                return products.map(product => {
                    return {
                        ...product,
                        quantity: this.cart.items.find(i => i.productId.toString() === product._id.toString()).quantity
                    };
                });
            })
            .catch(err => console.log(err));
    };

    deleteItemFromCart(productId) {

        const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== productId.toString());
        const db = getDb();

        return db.collection("users")
            .updateOne(
                { _id: new ObjectId(this._id) },
                { $set: { cart: { items: updatedCartItems } } }
            )
            .then(result => {

                // console.log("===> deleteItemFromCart:", result);
                return productId;
            })
            .catch(err => console.log(err));
    }

    addOrder() {

        const db = getDb();

        return this.getCart()
            .then(products => {

                const order = {
                    // @NOTE: <embedded relation logic>
                    items: products,
                    user: {
                        _id: new ObjectId(this._id),
                        name: this.firstName + " " + this.lastName
                    }
                };

                return db.collection("orders").insertOne(order);
            })
            .then(result => {

                this.cart = { items: [] };
                return db.collection("users")   // Also empty the cart in "users" collection
                    .updateOne(
                        { _id: new ObjectId(this._id) },
                        { $set: { cart: { items: [] } } }
                    )
            })
            .catch(err => console.log(err));
    };

    getOrders() {

        const db = getDb();

        return db.collection("orders")
    }

    static findById(userId) {

        const db = getDb();

        return db.collection("users")
            .findOne({ _id: new ObjectId(userId) })
            .then(user => {

                // console.log("===> model user.js| succeeded find user ", user);
                return user;
            })
            .catch(err => console.log(err));
    };
};

module.exports = User;
