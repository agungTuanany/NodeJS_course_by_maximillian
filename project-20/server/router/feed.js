"user strict"

// 3rd party Dependencies
const express = require("express");

// Internal Dependencies
const feedController = require("./../controllers/feed.js");

const router = express.Router()

// GET /feed/posts
router.get("/posts", feedController.getPosts);

// POST /feed/post
router.post("/post", feedController.createPost)

module.exports = router;
