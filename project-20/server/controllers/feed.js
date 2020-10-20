"user strict"

// 3rd party Dependencies
const { validationResult } = require("express-validator");

// Internal Dependencies
const Post = require("./../models/post.js");

const getPosts = (request, response, next) => {

    Post.find()
        .then(posts => {

            return response
                .status(200)
                .json({
                    message: "Fetched Post Successfully",
                    posts: posts
                });
        })
        .catch(err => {

            if (!err.statusCode) {
                console.log("===> post.find() getPosts error", err);
                err.statusCode = 500;
            };
                next(err);
        })
};

const createPost = (request, response, next) => {

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        const error = new Error("Validation falied, please correct the entered data");
        error.statusCode = 422;

        console.log("===> errors", errors)
        throw error;
    };

    if (!request.file) {
        const error = new Error("No Image provided");
        error.statusCode = 422;

        throw error;
    };

    const imageUrl = request.file.path;
    const title = request.body.title;
    const content = request.body.content;

    const post = new Post({
        title: title,
        content: content,
        imageUrl: imageUrl,
        creator: {
            name: "Donald Humpery"
        },
    })

    // Save new post into MongoDB
    post.save()
        .then(result => {

            return response
                .status(201) // @NOTE:201 = resource created successfully
                .json({
                    message: "Post created successfully",
                    post: result
                });
        })
        .catch(err => {

            if (!err.statusCode) {
            console.log("===> post.save() error:", err);
                err.statusCode = 500;
            };

            next(err);
        });
};

// Fetching single post
const getPost = (request, response, next) => {

    const postId = request.params.postId;

    Post.findById(postId)
        .then(post => {

            if (!post) {
                const error = new Error("Could not find the post");
                error.statusCode = 404;

                throw error;
            };

            return response
                .status(200)
                .json({
                    message: "Post fetched",
                    post: post
                });
        })
        .catch(err => {

            if (!err.statusCode) {
                console.log("===> post.findById() getPost error", err);
                err.statusCode = 500;
            };
                next(err);
        });
};

module.exports = {
    getPosts,
    createPost,
    getPost
};
