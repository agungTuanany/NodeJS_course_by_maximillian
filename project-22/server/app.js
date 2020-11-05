"use strict"

// Core Dependencies
const path = require("path");

// 3rd party Dependencies
const express    = require("express");
const bodyParser = require("body-parser");
const mongoose   = require("mongoose");
const multer     = require("multer");

// Internal Dependencies
const feedRoutes = require("./router/feed.js");
const authRoutes = require("./router/auth.js");

// Global variables
const app  = express()
const port = 8081;

const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {

        callback(null, "images");
    },
    filename: (request, file, callback) => {

        callback(null, `${new Date().toISOString()}-${file.originalname}`);
    }
});

const fileFilter = (request, file, callback) => {

    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};

const MONGODB_URI = "mongodb+srv://daun:bMSKaebmN7o4Tmsk@udemy-nodejs-maximillia.tz0sa.mongodb.net/rest-api-max-course?retryWrites=true&w=majority"

// app.use(bodyParser.urlencoded());    // for: x-www-form-urlencoded <form>
app.use(bodyParser.json())              // for: application/json

app.use(
    multer({
        storage: fileStorage,
        fileFilter: fileFilter
    })
    .single("image")
);

app.use("/images", express.static(path.join(__dirname, "images")));

app.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    next();
});

app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);

// General error handling
app.use((error, request, response, next) => {

    console.log("===> General error handling middleware:", error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data =error.data;

    return response
        .status(status)
        .json({
            message: message,
            data: data
        });
});


// Mongoose
mongoose.connect(MONGODB_URI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(result => {

        console.log("Succeeds connect with MongoDB database with mongoose")
        const server = app.listen(port, () => console.log(`You run "project-21" in server running by "Express" in port: "${port}".`));
        const io = require("./socket.js").init(server);

        io.on("connection", socket => {

            console.log("socket.io ====> Client connected");
        });
    })
    .catch(err => console.log(err));
