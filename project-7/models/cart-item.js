"use strict";

/*
 * A model for single cart-item from 'cart'.
 *
 * This is a central place to organized, structured, manipulate your single entity
 * for cart-item.
 */

// Core Dependencies

// 3rd party Dependencies
const { DataTypes } = require("sequelize");
//
// Internal Dependencies
const sequelize = require("./../lib/database.js");

const CartItem = sequelize.define("cartItem", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity:{
        type:  DataTypes.INTEGER
    }
})

module.exports = CartItem;
