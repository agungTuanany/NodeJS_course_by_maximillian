"use strict"

// 3rd party Dependencies
const mongoose   = require("mongoose");

Const Schema = mongoose.Schema;

const postSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    creator: {
        type: Object,
        required: true
    }
},
    { timestamp: true }
);

module.exports = mongoose.model("Post", postSchema);
