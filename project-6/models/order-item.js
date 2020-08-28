"use strict";

/*
 * A model for single entity from 'order-item'.
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

const OrderItem = sequelize.define("orderItems", {
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

module.exports = OrderItem;
