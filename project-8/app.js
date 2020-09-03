"use strict";

// Core Dependencies
const path = require("path");

// 3rd party Dependencies
const express    = require("express");
const bodyParser = require("body-parser");
const mongoose   = require("mongoose");

// Internal Dependencies
const rootDir          = require("./lib/path.js");
// const { mongoConnect } = require("./lib/database.js");
const User             = require("./models/user.js");

// Global variables
const app = express();
const port = 8080;

// template engine config
app.set("view engine", "ejs");
app.set("views", "views"); // Config explicitly

const adminRoutes     = require("./routes/admin.js");
const shopRoutes      = require("./routes/shop.js");
const errorController = require("./controllers/404.js");

// Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((request, response, next) => {
    User.findById("5f4ed6baffb67c79467cb4db")
        .then(user => {
            //(firstName, lastName, email, cart, id)
            request.user = new User(user.firstName, user.lastName, user.email, user.cart, user._id);
            next();
        })
        .catch(err => console.log(err))
});

// Routes handlers
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

// Mongoose
// @TODO: move this credential into .env
mongoose.connect("mongodb+srv://daun:WW2thoti3v9mphPW@udemy-nodejs-maximillia.tz0sa.mongodb.net/mongooseShop?retryWrites=true&w=majority",
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(result => {
        console.log("Succeeds connect with MongoDB database with mongoose")
        app.listen(port, () => console.log(`You run "project-8" in server running by "Express" in port: "${port}".`));
    })

// Mongo Connection
// mongoConnect(()=> {
// });

