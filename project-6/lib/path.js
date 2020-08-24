"use strict";
/*
 * A helper functions
 */

// Core Dependencies
const path = require("path");

const pathDirName = path.dirname(process.mainModule.filename);

module.exports = pathDirName;
