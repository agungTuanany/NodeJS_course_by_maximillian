"use strict";

// Core Dependencies
const path = require("path");

// 3rd party Dependencies
const express = require("express");
const bodyParser = require("body-parser");

// Internal Dependencies
const rootDir = require("./lib/path.js");
const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");
const errorController = require("./controllers/404.js");
const sequelize = require("./lib/database.js");
const Product = require("./models/product.js");
const User = require("./models/user.js");

// Global variables
const app = express();
const port = 8080;

app.set("view engine", "ejs");

// Config explicitly
app.set("views", "views");

// Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Serve Static file
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "public/css")));

// Admin routes handlers
app.use("/admin", adminRoutes);

// Shop router handlers
app.use(shopRoutes);

// 404 handlers
app.use(errorController.get404);

// Define database relations
Product.belongsTo(User, {
    constraint: true,
    onDelete: "CASCADE"
});

User.hasMany(Product);

sequelize
    .sync({
        // Dropping a table if exist | this options only for Stagging
        force: true,
        // Check the current table state | this options only for Stagging
        // alter: true,
    })
    .then(result => {
        console.log(result)
        app.listen(port, () => console.log(`You run "project-6" in server running by "Express" in port: "${port}".`));
    })
    .catch(err => console.lg(err));
