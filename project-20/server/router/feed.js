"user strict"

// 3rd party Dependencies
const express = require("express");
const { body } = require("express-validator");

// Internal Dependencies
const feedController = require("./../controllers/feed.js");
const { jwtAuth } = require("./../middleware/is-auth.js");

const router = express.Router();

// GET /feed/posts
router.get("/posts", jwtAuth, feedController.getPosts);

// POST /feed/post
router.post("/post",
    jwtAuth,
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

router.get("/post/:postId", jwtAuth, feedController.getPost);

router.put("/post/:postId",
    jwtAuth,
    [
        body("title")
            .trim()
            .isLength({ min: 5 }),
        body("content")
            .trim()
            .isLength({ min: 5 })
    ],
    feedController.updatePost
);

router.delete("/post/:postId", jwtAuth, feedController.deletePost);

module.exports = router;
