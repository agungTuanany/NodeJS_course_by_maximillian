const Sequelize = require("sequelize");

//     // @TODO: move this credential into .env
const sequelize = new Sequelize("node_complete", "daun", "daun", {
    dialect: "mariadb",
    host: "localhost",
    timezone: "Etc/GMT-7",
    logging: false
});

module.exports = sequelize;
