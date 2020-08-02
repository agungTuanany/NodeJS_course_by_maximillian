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

const app = express();

// Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Admin routes handlers
app.use("/admin", adminRoutes);

// Shop router handlers
app.use(shopRoutes);

// 404 handlers
app.use((request, response, next) => {

    return response
        .status(404)
        .sendFile(path.join(rootDir, "views", "page-not-found.html"));
});

app.listen(8088);