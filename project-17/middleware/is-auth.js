const isAuth = (request, response, next) => {

    if (!request.session.isLoggedIn) {
        return response
            .status(301)
            .redirect("/login")
    };

    next();
}

module.exports = isAuth;
