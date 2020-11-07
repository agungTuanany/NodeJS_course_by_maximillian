/*
 * Define GraphQL logic to executed for incoming queries
 *
 */
const bcrypt = require("bcryptjs");

const User = require("./../models/user.js");

module.exports = {
    createUser: async function({ userInput }, request) {
        // const email = args.userInput.email;
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
