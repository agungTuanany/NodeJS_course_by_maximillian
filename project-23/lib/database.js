const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

// Global variables
let _db;

const mongoConnect = callback => {

    // @TODO: move this credential into .env
    MongoClient.connect("mongodb+srv://daun:WW2thoti3v9mphPW@udemy-nodejs-maximillia.tz0sa.mongodb.net/udemy-nodejs-maximillian?retryWrites=true&w=majority", {useUnifiedTopology: true})
        .then((client) => {
            console.log("Succeeds connect with MongoDB database")
            _db = client.db()
            callback(client);
        })
        .catch(err => {
            console.log(err)
            throw err;
        });
};

const getDb = () => {

    if (!_db) {
        throw "No database found";
        return;
    }

    return _db;
}

module.exports = {
    mongoConnect,
    getDb
};

