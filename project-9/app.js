"use strict";

// Core Dependencies
const path = require("path");

// 3rd party Dependencies
const express    = require("express");
const bodyParser = require("body-parser");
const mongoose   = require("mongoose");

// Internal Dependencies
const rootDir          = require("./lib/path.js");
const User             = require("./models/user.js");
const errorController  = require("./controllers/404.js");

// Global variables
const app = express();
const port = 8080;

// template engine config
app.set("view engine", "ejs");
app.set("views", "views"); // Config explicitly

// Routers
const adminRoutes = require("./routes/admin.js");
const shopRoutes  = require("./routes/shop.js");
const authRoutes  = require("./routes/auth.js");

// Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((request, response, next) => {
    User.findById("5f53be3cb6e9934b390021e0")
        .then(user => {
            //(firstName, lastName, email, cart, id)
            request.user = user;
            next();
        })
        .catch(err => console.log(err))
});

// Routes handlers
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

// Mongoose
// @TODO: move this credential into .env
mongoose.connect("mongodb+srv://daun:WW2thoti3v9mphPW@udemy-nodejs-maximillia.tz0sa.mongodb.net/mongooseShop?retryWrites=true&w=majority",
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(result => {

        User.findOne()
            .then(user => {
                if (!user) {
                    const user = new User({
                        firstName: "Dummy",
                        lastName: "data",
                        email: "Dummy@data.com",
                        cart: {
                            items: []
                        }
                    });
                    user.save()
                };
            });

        console.log("Succeeds connect with MongoDB database with mongoose")
        app.listen(port, () => console.log(`You run "project-9" in server running by "Express" in port: "${port}".`));
    })
    .catch(err => console.log(err));
