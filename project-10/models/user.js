"use strict";

/*
 * A model for single entity from 'user'.
 *
 * Is a central place to organized, structured, manipulate your single entity
 * for user.
 *
 * @NOTE: @param: toString() is to ensure that every update Cart is only work in
 * string, as in MongoDB is not exactly 'type of string'
 */

// Core Dependencies

// 3rd party Dependencies
const mongoose = require("mongoose");

// Internal Dependencies

// Global variables
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: "Product"
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
});

// Utility | instant methods
userSchema.methods.addToCart = function(product) {

    const cartProductIndex = this.cart.items.findIndex(cartProductArray => {

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
            productId: product._id,
            quantity: newQuantity
        });
    };

    const updatedCart = { items: updatedCartItems };
    this.cart = updatedCart;
    return this.save();
};

userSchema.methods.removeFromCart = function(productId) {

    const updatedCartItems = this.cart.items.filter(item => {

        return item.productId.toString() !== productId.toString();
    });

    this.cart.items = updatedCartItems;
    return this.save();
};

userSchema.methods.clearCart = function() {

    this.cart = { items: [] };
    return this.save();
};

module.exports = mongoose.model("User", userSchema);


// class User {

//     constructor(firstName, lastName, email, cart, id) {

//         this.firstName = firstName;
//         this.lastName  = lastName;
//         this.email     = email;
//         this.cart      = cart; // {items: []}
//         this._id       = id;
//     };

//     save() {

//         const db = getDb();
//         return db.collection("users")
//             .insertOne(this)
//             .then(result => {

//                 console.log("===> model user.js| succeeded create new user ",result);
//             })
//             .catch(err => console.log(err));
//     };

//     addToCart(product) {

//         const cartProductIndex = this.cart.items.findIndex(cartProductArray => {

//             // @NOTE: @param: toString() is to ensure that every updatd Cart is
//             // only work in string, as in MongoDB is not exactly 'type of string'
//             return cartProductArray.productId.toString() === product._id.toString();
//         });

//         let newQuantity = 1;
//         const updatedCartItems = [...this.cart.items];

//         if (cartProductIndex >= 0) {
//             newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//             updatedCartItems[cartProductIndex].quantity = newQuantity;
//         }
//         else {
//             updatedCartItems.push({
//                 productId: new ObjectId(product._id),
//                 quantity: newQuantity
//             });
//         };

//         const updatedCart = { items: updatedCartItems };
//         const db = getDb();

//         return db.collection("users")
//             .updateOne(
//                 { _id: new ObjectId(this._id) },
//                 { $set: { cart: updatedCart } } // overwrite the 'old cart' with 'new cart' value
//             )
//             .then(result => {

//                 // console.log("===> addToCart:", result);
//                 return result;
//             })
//             .catch(err => console.log(err));
//     };

//     // @TODO: Create worker-process to check deleted Items from the Cart.
//     // for some cases in MongoDB database, eg: scan users, carts, and products, which
//     // don't find in products collection to clean up the Carts.
//     getCart() {

//         const db = getDb();
//         const productIds = this.cart.items.map(i => i.productId);

//         return db.collection("products")
//             .find({
//                 _id: { $in: productIds }
//             })
//             .toArray()
//             .then(products => {

//                 return products.map(product => {
//                     return {
//                         ...product,
//                         quantity: this.cart.items.find(i => i.productId.toString() === product._id.toString()).quantity
//                     };
//                 });
//             })
//             .catch(err => console.log(err));
//     };

//     deleteItemFromCart(productId) {

//         const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== productId.toString());
//         const db = getDb();

//         return db.collection("users")
//             .updateOne(
//                 { _id: new ObjectId(this._id) },
//                 { $set: { cart: { items: updatedCartItems } } }
//             )
//             .then(result => {

//                 // console.log("===> deleteItemFromCart:", result);
//                 return productId;
//             })
//             .catch(err => console.log(err));
//     }

//     addOrder() {

//         const db = getDb();

//         return this.getCart()
//             .then(products => {

//                 const order = {
//                     // @NOTE: <embedded relation logic>
//                     items: products,
//                     user: {
//                         _id: new ObjectId(this._id),
//                         name: this.firstName + " " + this.lastName
//                     }
//                 };

//                 return db.collection("orders").insertOne(order);
//             })
//             .then(result => {

//                 this.cart = { items: [] };
//                 return db.collection("users")   // Also empty the cart in "users" collection
//                     .updateOne(
//                         { _id: new ObjectId(this._id) },
//                         { $set: { cart: { items: [] } } }
//                     )
//             })
//             .catch(err => console.log(err));
//     };

//     getOrders() {

    //         const db = getDb();

//         return db.collection("orders")
    //             .find({ "user._id": new ObjectId(this._id) })
//             .toArray()
//             .catch(err => console.log(err));
//     };

//     static findById(userId) {

//         const db = getDb();

//         return db.collection("users")
//             .findOne({ _id: new ObjectId(userId) })
//             .then(user => {

//                 // console.log("===> model user.js| succeeded find user ", user);
//                 return user;
    //             })
//             .catch(err => console.log(err));
//     };
// };

// module.exports = User;
