"user strict"

// 3rd party Dependencies
const express = require("express");
const { body } = require("express-validator");

// Internal Dependencies
const feedController = require("./../controllers/feed.js");

const router = express.Router()

// GET /feed/posts
router.get("/posts", feedController.getPosts);

// POST /feed/post
router.post("/post",
    [
        body("title")
            .trim()
            .isLength({ min: 5 }),
        body("content")
            .trim()
            .isLength({ min: 5 })
    ],
    feedController.createPost
);

router.get("/post/:postId", feedController.getPost);

module.exports = router;
