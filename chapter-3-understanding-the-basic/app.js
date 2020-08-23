"use strict";

// External Dependencies
const http = require("http");

// Internal Dependencies
const routes = require("./lib/routes.js")

// Instantiate HTTP server
const server = http.createServer(routes.handler);

// Emit HTTP server
server.listen(8088);
