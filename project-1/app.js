"use strict";

// Core Dependencies
const path = require("path");

// 3rd party Dependencies
const express = require("express");
const bodyParser = require("body-parser");
// const expressHbs = require("express-handlebars");        // Uncomment this for using .handlebars

// Internal Dependencies
const rootDir = require("./lib/path.js");
const adminData = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");

// Global variables
const app = express();
const port = 8080;

// app.engine("handlebars", expressHbs({                    // Uncommnet this for using .handlebars
//     layoutDir: "views/layouts",
//     defaultLayout: "main-layout",
//     extname: "handlebars"
// }));

app.set("view engine", "ejs");                              // Change this for using .handlebars or .pug

// Config explicitly
app.set("views", "views");

// Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Serve Static file
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/css")));

// Admin routes handlers
app.use("/admin", adminData.routes);

// Shop router handlers
app.use(shopRoutes);

// 404 handlers
app.use((request, response, next) => {

    return response
        .status(404)
        .render("page-not-found", {
            pageTitle: "Page Not Found",
            path: "/"
        });
});

app.listen(port, () => console.log(`Your server running by "Express" in port: "${port}".`));
