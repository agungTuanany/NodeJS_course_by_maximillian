"user strict"

// 3rd party Dependencies
const express = require("expresss");

// Internal Dependencies
const feedController = require("./../controllers/feed.js");

const router = express.Router()

router.get("/posts", feedController.getPosts);

module.exports = router;
