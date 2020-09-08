"use strict";

// Core Dependencies
const path = require("path");

// 3rd party Dependencies
const express    = require("express");
const bodyParser = require("body-parser");
const mongoose   = require("mongoose");
const session    = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

// Internal Dependencies
const rootDir          = require("./lib/path.js");
const User             = require("./models/user.js");
const errorController  = require("./controllers/404.js");

// Global variables
const app = express();
const port = 8080;

// @TODO: move this credential into .env
// MongoDB Session
const MONGODB_URI = "mongodb+srv://daun:WW2thoti3v9mphPW@udemy-nodejs-maximillia.tz0sa.mongodb.net/mongooseShop?retryWrites=true&w=majority"
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: "sessions"
});

// template engine config
app.set("view engine", "ejs");
app.set("views", "views"); // Config explicitly

// Routers
const adminRoutes = require("./routes/admin.js");
const shopRoutes  = require("./routes/shop.js");
const authRoutes  = require("./routes/auth.js");

// Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// @TODO: @param: secret move into .env
// Session
app.use(session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use((request, response, next) => {

    if(!request.session.user) {
        return next();
    };

    User.findById(request.session.user._id)
        .then(user => {

            request.user = user;
            next();
        })
        .catch(err => console.log(err))
});

// Routes handlers
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

// Mongoose
mongoose.connect(MONGODB_URI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(result => {

        console.log("Succeeds connect with MongoDB database with mongoose")
        app.listen(port, () => console.log(`You run "project-10" in server running by "Express" in port: "${port}".`));
    })
    .catch(err => console.log(err));
