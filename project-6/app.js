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
const Cart = require("./models/cart.js");
const CartItem = require("./models/cart-item.js");
const Order = require("./models/order.js");
const OrderItem = require("./models/order-item.js");

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

app.use((request, response, next) => {
    User.findByPk(1)
        .then(user => {
            request.user = user;
            next();
        })
        .catch(err => console.log(err))
})

// Admin routes handlers
app.use("/admin", adminRoutes);

// Shop router handlers
app.use(shopRoutes);

// 404 handlers
app.use(errorController.get404);

// https://sequelize.org/master/class/lib/associations/base.js~Association.html
// Define database relations | associations
Product.belongsTo(User, {
    constraint: true,
    onDelete: "CASCADE"
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
    .sync({
        // Dropping a table if exist | this options only for Staging
        // force: true,
        // Check the current table state | this options only for Staging
        // alter: true,
    })
    .then(result => {

        // console.log(result)
        return User.findByPk(1);
    })
    .then(user => {

        if (!user) {
            return User.create({
                first_name: "boot",
                last_name: "dummy",
                email: "boot@dummy.com"
            });

        }
        return user;
        // return Promise.resolve(user);
    })
    .then(user => {
        // console.log("user:", user);
        return user.createCart();
    })
    .then(cart => {
        app.listen(port, () => console.log(`You run "project-6" in server running by "Express" in port: "${port}".`));
    })
    .catch(err => console.log(err));
