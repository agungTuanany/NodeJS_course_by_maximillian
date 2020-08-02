"use strict";

// Core Dependencies
//...

// 3rd party Dependencies
const express = require("express");
const bodyParser = require("body-parser");

// Internal Dependencies
const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");

const app = express();

// Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Admin routes handlers
app.use(adminRoutes);

// Shop router handlers
app.use(shopRoutes);


app.listen(8088);
