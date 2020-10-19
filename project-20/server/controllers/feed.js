"user strict"

// 3rd party Dependencies
const { validationResult } = require("express-validator");

// Internal Dependencies
const Post = require("./../models/post.js");

const getPosts = (request, response, next) => {

    return response
        .status(200)
        .json({
            posts: [
                {
                    _id: "1",
                    title: "First Post",
                    content: "This is the firts post!",
                    imgeUrl: "images/wholemeal.jpg",
                    creator: {
                        name: "Donald Humpery"
                    },
                    createdAt: new Date()
                }
            ]
        });
};

const createPost = (request, response, next) => {

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response
            .status(422)
            .json({
                message: "Validation failed, the entered data  is incorrect",
                errors: errors.array()
            });
    };

    const title = request.body.title;
    const content = request.body.content;

    const post = new Post({
        title: title,
        content: content,
        imageUrl: "images/wholemeal.jpg",
        creator: {
            name: "Donald Humpery"
        },
    })

    // Save new post into MongoDB
    post.save()
        .then(result => {

            console.log("===> post.save():", result);

            return response
                .status(201) // @NOTE:201 = resource created successfully
                .json({
                    message: "Post created successfully",
                    post: result
                });
        })
        .catch(err => {

            console.log("===> post.save() error:", err);
        })

    // Create post in DB

}

module.exports = {
    getPosts,
    createPost
};
