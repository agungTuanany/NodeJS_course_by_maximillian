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

        this.title = titile;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
    };
}

// const Product = sequelize.define("products", {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true,
//     },
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     price: {
//         type: DataTypes.DOUBLE,
//         allowNull: false
//     },
//     imageUrl: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     description: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// });

module.exports = Product;
