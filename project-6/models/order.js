"use strict";

/*
 * A model for single entity from 'order'.
 *
 * This is a central place to organized, structured, manipulate your single entity
 * for order.
 */

// Core Dependencies

// 3rd party Dependencies
const { DataTypes } = require("sequelize");
//
// Internal Dependencies
const sequelize = require("./../lib/database.js");

const Order = sequelize.define("order", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    }
    // @TODO: add more information like an address, etc...
})

module.exports = Order;
