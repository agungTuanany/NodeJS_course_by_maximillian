"user strict"

// 3rd party Dependencies
const { validationResult } = require("express-validator");

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

    // Create post in DB
    return response
        .status(201) // @NOTE:201 = resource created successfully
        .json({
            message: "Post created successfully",
            post: {
                _id: new Date().toISOString(),
                title: title,
                content: content,
                creator: {
                    name: "Donald Humpery"
                },
                createdAt: new Date()
            }
        })

}

module.exports = {
    getPosts,
    createPost
};
