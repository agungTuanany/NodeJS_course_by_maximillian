"user strict"

const getPosts = (request, response, next) => {

    return response
        .status(200)
        .json({
        posts: [{
            "title": "First Post",
            "content": "This is the firts post!"
        }]
    });

};

const createPost = (request, response, next) => {

    const title = request.body.title;
    const content = request.body.content;

    // Create post in DB
    return response
        .status(201) // @NOTE:201 = resource created successfully
        .json({
            "message": "Post created successfully",
            post: {
                id: new Date().toISOString(),
                title: title,
                content: content
            }
        })

}

module.exports = {
    getPosts,
    createPost
};
