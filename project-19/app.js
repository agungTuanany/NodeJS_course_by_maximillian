"use strict"

// 3rd party Dependencies
const express = require("express");

// Internal Dependencies
const feedRoutes = require("./router/feed.js");

// Global variables
const app =express()
const port = 8081;

app.use("/feeds", feedRoutes)





app.listen(port, () => console.log(`You run "project-19" in server running by "Express" in port: "${port}".`));
