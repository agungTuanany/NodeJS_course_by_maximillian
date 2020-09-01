"use strict";

// Core Dependencies
const path = require("path");

// 3rd party Dependencies
const express    = require("express");
const bodyParser = require("body-parser");

// Internal Dependencies
const rootDir      = require("./lib/path.js");
const { mongoConnect } = require("./lib/database.js");

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
    // User.findByPk(1)
    //     .then(user => {
    //         request.user = user;
    //         next();
    //     })
    //     .catch(err => console.log(err))
    next()
})

// Routes handlers
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

// Mongo Connection
mongoConnect(()=> {
    app.listen(port, () => console.log(`You run "project-7" in server running by "Express" in port: "${port}".`));
});

