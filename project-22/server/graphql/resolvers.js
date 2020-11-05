/*
 * Define GraphQL logic to executed for incoming queries
 *
 */

module.exports = {
    hello()  {
        return {
            text: "Hello Wolrd!",
            views: 1234
        };
    }
};
