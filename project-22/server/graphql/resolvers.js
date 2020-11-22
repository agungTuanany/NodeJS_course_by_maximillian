/*
 * Define GraphQL logic to executed for incoming queries
 *
 */

// 3rd party Dependencies
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

// Internal Dependencies
const User = require("./../models/user.js");
const Post = require("./../models/post.js");

module.exports = {
    createUser: async function({ userInput }, request) {
        // const email = args.userInput.email;

        const errors = [];

        if (!validator.isEmail(userInput.email)) {
            errors.push({ message: "Email is invalid" })
        }

        if (
            validator.isEmpty(userInput.password) ||
            validator.isLength(userInput.password, { min: 5  })
        ) {
            errors.push({ message: "Password too short!" });
        }

        if (errors.length > 0) {
            const error = new Error("Invalid input");
            error.data = errors;
            error.code = 422;
            throw error;
        }

        const exisistingUser = await User.findOne({ email: userInput.email });

        if (exisistingUser) {
            const error = new Error("User exists already!");
            throw error;
        };

        const hashedPassword = await bcrypt.hash(userInput.password, 12);
        const user =  new User({
            email: userInput.email,
            name: userInput.name,
            password: hashedPassword
        });

        const createdUser = await user.save();

        return {
            ...createdUser._doc,
            _id: createdUser._id.toString()
        }
    },

    login: async function({ email, password }) {
        const user = await User.findOne({ email: email });

        if (!user) {
            const error = new Error(`user witha email: ${email} not found `);
            error.code = 401;        // 401 =  Not authenticated

            throw error;
        };

        const passwordIsEqual = await bcrypt.compare(password, user.password);

        if (!passwordIsEqual) {
            const error = new Error("Password is incorrect");
            error.code = 401;

            throw error;
        };

        const token = jwt.sign(
        {
            userId: user._id.toString(),
            email: user.email
        },
            "somesupersecretsecret",
            { expiresIn: "1h" }
        );

        return {
            token: token,
            userId: user._id.toString()
        };
    },
    createPost: async function({ postInput }, request) {

        if (!request.isAuth) {
            const error = new Error("User Not authenticated for creating a post");
            error.code = 401;

            throw error;
        }

        const errors = [];

        if (validator.isEmpty(postInput.title) || !validator.isLength(postInput.title, { min: 5 })) {
            errors.push({ message: "Title is invalid" });
        };

        if (validator.isEmpty(postInput.content) || !validator.isLength(postInput.content, { min: 5 })) {
            errors.push({ message: "Content is invalid" });
        };

        if (errors.length > 0) {
            const error = new Error("CreatPost error handlers");
            error.data = errors;
            error.code = 422;

            throw error;
        };

        const user = await User.findById(request.userId);

        if (!user) {
            const error = new Error("Invalid User for creating a post");
            error.code = 401;

            throw error;
        }

        const post = new Post({
            title: postInput.title,
            content: postInput.content,
            imageUrl: postInput.imageUrl,
            creator: user
        });

        const createdPost = await post.save();

        user.posts.push(createdPost);

        await user.save();

        return {
            ...createdPost._doc,
            id: createdPost._id.toString(),
            createdAt: createdPost.createdAt.toISOString(),
            updatedAt: createdPost.updatedAt.toISOString()
        };
    },

    posts: async function({page}, request) {

        if (!request.isAuth) {
            const error = new Error("User Not authenticated for creating a post");
            error.code = 401;

            throw error;
        };

        if (!page) {
            page = 1;
        }

        const perPage = 2;

        const totalPosts = await Post.find().countDocuments();
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * perPage)
            .limit(perPage)
            .populate("creator");

        return {
            posts: posts.map(p => {

                return {
                    ...p._doc,
                    _id: p._id.toString(),
                    createdAt: p.createdAt.toISOString(),
                    updatedAt: p.updatedAt.toISOString()
                };
            }),
            totalPosts: totalPosts
        };
    },

    post: async function({id}, request) {

        if (!request.isAuth) {
            const error = new Error("User Not authenticated for creating a post");
            error.code = 401;

            throw error;
        };

        const post = await Post.findById(id).populate("creator");

        if (!post) {
            const error = new Error("No single post found!");
            error.code = 404;

            throw error;
        };

        return {
            ...post._doc,
            _id: post._id.toString(),
            createdAt: post.createdAt.toISOString(),
            updatedAt: post.updatedAt.toISOString()
        }
    },

    updatePost: async function({id, postInput}, request) {

        if (!request.isAuth) {
            const error = new Error("User Not authenticated for creating a post");
            error.code = 401;

            throw error;
        };

        const post = await Post.findById(id).populate("creator");

        if (!post) {
            const error = new Error("No single post found!");
            error.code = 404;

            throw error;
        };

        if (!post.creator._id.toString() === request.userId.toString()) {
            const error = new Error("Not authorized to edit the post!");
            error.code = 403;

            throw error;
        };

        const errors = [];

        if (!validator.isEmail(userInput.email)) {
            errors.push({ message: "Email is invalid" })
        };

        if (
            validator.isEmpty(userInput.password) ||
            validator.isLength(userInput.password, { min: 5  })
        ) {
            errors.push({ message: "Password too short!" });
        };

        if (errors.length > 0) {
            const error = new Error("Invalid input");
            error.data = errors;
            error.code = 422;
            throw error;
        };
        post.title = postInput.title;
        post.content = postInput.content;

        if (postInput.imageUrl !== "undefined") {
            post.imageUrl = postInput.imageUrl;
        };

        const updatedPost = await post.save();

        return {
            ...updatedPost._doc,
            _id: updatePost.id.toString(),
            createdAt: updatedPost.createdAt.toISOString(),
            updatedAt: updatedPost.updatedAt.toISOString()
        };
    }


};
