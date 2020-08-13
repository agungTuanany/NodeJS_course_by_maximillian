"use strict";

/*
 * A single entity from 'products'
 *
 */

const products = []

const Product = class Product {

    constructor(title) {
        this.title = title
    };

    save() {
        products.push(this.title);
    };

    static fetchAll() {
        return products;
    };
};

module.exports = Product;


