"use strict";

/*
 * A model for single entity from 'order'.
 *
 * This is a central place to organized, structured, manipulate your single entity
 * for order.
 */

// Core Dependencies

// 3rd party  Dependencies
const mongoose = require("mongoose");

// Internal Dependencies
const Schema = mongoose.Schema;

const orderSchema = new Schema({

    products: [
        {
            product: {
                type: Object,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    user: {
        firstName: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User"
        }
    }
});

module.exports =  mongoose.model("Order", orderSchema);
