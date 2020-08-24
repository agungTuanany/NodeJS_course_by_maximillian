const mysql = require("mysql2");


const pool = mysql.createPool({

    host: "localhost",
    user: "daun",
    database: "node_complete",
    // @TODO: move this credential into .env
    password: "daun"
});

module.exports = pool.promise();

