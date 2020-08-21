"use strict";

/*
 * A model for single entity from 'cart'.
 *
 * Is a central place to organized, structured, manipulate your single entity
 * for cart.
 */

// Core Dependencies
const fs = require("fs");
const path = require("path")

// Internal Dependencies
const rootDir = require("./../lib/path.js");

// Global variables
const p = path.join(rootDir, ".data", "cart.json");


const Cart = class Cart {

    // constructor() {
    //     this.products = [];
    //     this.totalPrice = 0;
    // };

    static addProduct(id, productPrice) {

        // Fetch the previous cart
        fs.readFile(p, "utf8", (err, data) => {

            let cart = {
                products: [],
                totalPrice: 0
            };

            /* @FIXME: if you do not have 'cart.json' file; it will instantiate
             * an error. The program should create a 'cart.json' automatically.
             */

            // if (err && data) {
            //     console.log(err)
            //     throw err
            //     return;
            // }

            if (!err && data) {
                cart = JSON.parse(data);
                // This console.log will fired up after 'cart.json' exist;
                console.log("cart.js ===> fs.readFile:", cart);
            }
            else {
                console.log("ERROR: you don't have 'cart.json' flie");

                // Uncomment this for production
                // return;
            };


            /* @NOTE: This the logic I should repeatedly read. As I don't grasp;
             * You should READ THE CODE BELOW CAREFULLY!.
            */

            // Analyze the cart => Find existing product
            const existingProductIndex = cart.products .findIndex(product => product.id === id);
            const existingProduct = cart.products[existingProductIndex];
            // @FIXME: You should explicit!; not return any variable as 'null'
            let updatedProduct;

            // Add new Product | increase quantity
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else {
                updatedProduct = {
                    id: id,
                    qty: 1
                };

                cart.products = [...cart.products, updatedProduct];
            };

            cart.totalPrice = cart.totalPrice + productPrice;

            fs.writeFile(p, JSON.stringify(cart, null, 4), (err) => {

                if (err) {
                    console.log(err);
                    return;
                }
                else {
                    // @NOTE: Why not parse the 'data' instead 'cart'? Cause the
                    // 'data' parsed into JSON and encapsulated into 'cart' as an
                    // object.
                    console.log("writed cart.json file with data:", cart);
                    console.log(err); // result null
                    return;
                };
            });
        });
    };

    static deleteProduct(id, productPrice) {

        // @FIXME: if the specific 'id' in cart.json didn't punch the 'add
        // product button' is not registered; it will fire an error.
        fs.readFile(p, "utf8", (err, data) => {

            // return err cause the 'id' doesn't exist
            if(err) {
                console.log("Error in Cart Model method  'deleteProduct':", err);
                return;
            };

            const updatedCart = { ...JSON.parse(data) };
            const product = updatedCart.products.findIndex(product => product.id === id);
            const productQty = product.qty;

            updatedCart.products = updatedCart.products.filter(product => product.id !== id);

            // @FIXME: the totalPrice return 'null' cause updatedCart.totalPrice
            // also subtract the price that not belong to specific 'id'
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

            fs.writeFile(p, JSON.stringify(updatedCart, null, 4), (err, data) => {

                if (err) {
                    console.log(err);
                    return;
                }
                else {
                    console.log("Update cart.json file with data:", updatedCart);
                    console.log(err); // result null
                    return;
                };
            })
        });
    };
    static getCart(callback) {

        fs.readFile(p, "utf8", (err, data) => {

            const cart =JSON.parse(data);

            if (err) {
                callback(null);
            }
            else {
                callback(cart);
            };
        });

    };
};

module.exports = Cart;
