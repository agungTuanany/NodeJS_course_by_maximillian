"use strict"

// 3rd part Dependencies
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        // required: true
        default: "New User!"
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});

module.exports = mongoose.model("User", userSchema);
