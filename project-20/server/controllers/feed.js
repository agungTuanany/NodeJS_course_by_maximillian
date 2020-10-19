"user strict"

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
