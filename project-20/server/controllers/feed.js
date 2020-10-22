"user strict"

// Core Dependencies
const fs   = require("fs");
const path = require("path");

// 3rd party Dependencies
const { validationResult } = require("express-validator");

// Internal Dependencies
const Post = require("./../models/post.js");
const User = require("./../models/user.js");

const getPosts = (request, response, next) => {

    const currentPage = request.query.page || 1;
    const perPage = 2;
    let totalItems;

    Post.find()
        .countDocuments()
        .then(count => {

            totalItems = count;
            return Post.find()
                .skip((currentPage - 1) * perPage)
                .limit(perPage)
        })
        .then(posts => {

            return response
                .status(200)
                .json({
                    message: "Successfully fetched the all Posts",
                    posts: posts,
                    totalItems: totalItems
                });
        })
        .catch(err => {

            if (!err.statusCode) {
                console.log("===> post.find().countDocuments() getPosts error", err);
                err.statusCode = 500;
            };
                next(err);
        });
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
    let creator;

    const post = new Post({
        title: title,
        content: content,
        imageUrl: imageUrl,
        creator:  request.userId
    })

    // Save new post into MongoDB
    post.save()
        .then(result => {

            return User.findById(request.userId)
        })
        .then(user => {

            creator = user;
            user.posts.push(post);

            return user.save();

        })
        .then(result => {

            response
                .status(201) // @NOTE:201 = resource created successfully
                .json({
                    message: "Post created successfully",
                    post: post,
                    creator: {
                        _id: creator._id,
                        name: creator.name
                    }
                });
        })
        .catch(err => {

            if (!err.statusCode) {
            console.log("===> createPost post.save() error:", err);
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
                    message: "Successfully fetched the Post",
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

const updatePost = (request, response, next) => {

    const postId = request.params.postId;
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        const error = new Error("Validation falied, please correct the entered data");
        error.statusCode = 422;

        console.log("===> errors", errors)
        throw error;
    };

    const title = request.body.title;
    const content = request.body.content;
    let imageUrl = request.body.image;

    if (request.file) {
        imageUrl = request.file.path;
    };

    if (!imageUrl) {
        console.log("===> imageUrl", imageUrl)
        const error = new Error("updatePost error: No file for image selected");
        error.statusCode = 422;

        // console.log("===> errors", errors)
        // console.log("===> imageUrl error", error);
        throw error;
    };

    // Update the database
    Post.findById(postId)
        .then(post => {

            if (!post) {
                const error = new Error("Could not find the post");
                error.status = 404;

                throw error;
            };

            if (imageUrl !== post.imageUrl) {
                clearImage(post.imageUrl)
            };

            post.title = title;
            post.imageUrl = imageUrl;
            post.content = content;

            return post.save();

        })
        .then(result => {

            return response
                .status(200)
                .json({
                    message: "Successfully Updated the Post",
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

const deletePost = (request, response, next) => {

    const postId = request.params.postId;

    Post.findById(postId)
        .then(post => {

            if (!post) {
                const error = new Error("Could not find the post");
                error.status = 404;

                throw error;
            };

            // @TODO Check logged in user for auth
            clearImage(post.imageUrl);

            return Post.findByIdAndRemove(postId);
        })
        .then(result => {

            console.log("===> deletePost findByIdAndRemove - result:", result);

            return response
                .status(200)
                .json({
                    message: "Successfully Deleted the post"
                });
        })
        .catch(err => {

            if (!err.statusCode) {
                console.log("===> deletePost - post.findById() error:", err);
                err.statusCode = 500;
            };

            next(err);
        });
};

// Helper function
const clearImage = filePath => {

    filePath = path.join(__dirname, "..", filePath);

    fs.unlink(filePath, error => {

        // @TODO: Handle the error correctly
        console.log("clearImage error:", error);
    });
};



module.exports = {
    getPosts,
    createPost,
    getPost,
    updatePost,
    deletePost
};
