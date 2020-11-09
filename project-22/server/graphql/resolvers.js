/*
 * Define GraphQL logic to executed for incoming queries
 *
 */

// 3rd party Dependencies
const bcrypt = require("bcryptjs");
const validator = require("validator");

// Internal Dependencies
const User = require("./../models/user.js");

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
    }
};
