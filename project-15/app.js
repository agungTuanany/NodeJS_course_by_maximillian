"use strict";

// Core Dependencies
const path = require("path");

// 3rd party Dependencies
const express      = require("express");
const bodyParser   = require("body-parser");
const mongoose     = require("mongoose");
const session      = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf         = require("csurf");
const flash        = require("connect-flash");
const multer       = require("multer");

// Internal Dependencies
const rootDir          = require("./lib/path.js");
const User             = require("./models/user.js");
const errorController  = require("./controllers/error.js");

// Global variables
const app = express();
const port = 8080;

// @TODO: move this credential into .env
// MongoDB Session
const MONGODB_URI = "mongodb+srv://daun:bMSKaebmN7o4Tmsk@udemy-nodejs-maximillia.tz0sa.mongodb.net/mongooseShop?retryWrites=true&w=majority"
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: "sessions"
});

const csrfProtection = csrf();
const flashUX = flash();

const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {

        callback(null, 'images');
    },
    filename: (request, file, callback) => {

        callback(null, new Date().toISOString() + "-" + file.originalname);
    }
});

const fileFilter = (request, file, callback) => {

    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        callback(null, true);
    }
    else {
        callback(null, false);
    };
};

// template engine config
app.set("view engine", "ejs");
app.set("views", "views"); // Config explicitly

// Routers
const adminRoutes = require("./routes/admin.js");
const shopRoutes  = require("./routes/shop.js");
const authRoutes  = require("./routes/auth.js");

// Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

// @TODO: @param: secret move into .env
// Session
app.use(session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use(csrfProtection);
app.use(flashUX);

app.use((request, response, next) => {

    // @NOTE: locals() are special field on the ExpressJS response
    response.locals.isAuthenticated = request.session.isLoggedIn;
    response.locals.csrfToken = request.csrfToken();

    next();
});

app.use((request, response, next) => {

    // throw new Error(" %% ===> Dummy Error, Caused throw an error in Synchronous request %%") // @NOTE: Constructed scenario
    if(!request.session.user) {
        return next();
    };

    User.findById(request.session.user._id)
        .then(user => {

            // throw new Error(" %% ===> Dummy Error, Caused throw an error in Asynchronous request %%") // @NOTE: Constructed scenario
            if (!user) {
                return next();
            }

            request.user = user;
            next();
        })
        .catch(err => {

            // @NOTE: You should avoid infinite loop triggered for error handling middleware
            // @NOTE: Using 'next()' instead with 'throw' cause we handled Async code ('then', 'catch' or 'callback' not work with 'throw')
            next(new Error(err));
        });
});

// Routes handlers
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get("/500", errorController.get500);

app.use(errorController.get404);

app.use((error, request, response, next) => {

    // response.status(error.httpsStatusCode).render(...); // @NOTE: pass extra information with the error object
    // return response
    //     .status(500)
    //     .redirect("/500");

    return response
        .status(500)
        .render("500", {
            pageTitle: "Server Error",
            path: "/500",
            isAuthenticated: request.session.isLoggedIn
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
        app.listen(port, () => console.log(`You run "project-15" in server running by "Express" in port: "${port}".`));
    })
    .catch(err => console.log(err));
