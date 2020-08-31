"use strict";

/*
 * A model for single entity from 'cart'.
 *
 * This is a central place to organized, structured, manipulate your single entity
 * for cart.
 */

// Core Dependencies

// 3rd party Dependencies
const { DataTypes } = require("sequelize");
//
// Internal Dependencies
const sequelize = require("./../lib/database.js");

const Cart = sequelize.define("cart", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
})

module.exports = Cart;
