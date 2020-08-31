const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {

    // @TODO: move this credential into .env
    MongoClient.connect("mongodb+srv://daun:WW2thoti3v9mphPW@udemy-nodejs-maximillia.tz0sa.mongodb.net/udemy-nodejs-maximillian?retryWrites=true&w=majority", {useUnifiedTopology: true})
        .then((client) => {
            console.log("Success connect with MongoDB database")
            callback(client);
        })
        .catch(err => console.log(err));
};

module.exports = mongoConnect;

