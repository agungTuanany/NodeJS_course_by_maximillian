const Sequelize = require("sequelize");

//     // @TODO: move this credential into .env
const sequelize = new Sequelize("node_complete", "daun", "daun", {
    dialect: "mariadb",
    host: "localhost",
    timezone: "+07:00",
    logging: false
});

module.exports = sequelize;
