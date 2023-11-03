/**
 * @exports db - used in server.js & controller.js as common function to initialize DB 
 *
 */
const { dbdetail } = require("../config/database/index.database.config");
const Sequelize = require("sequelize");
var logger = require("../utility/logger.utils")
var CONSTANT = require("../constant/app.constant")
const db = {};
// Mapping sequelize ORM
const dbConfig = dbdetail
const sequelize = new Sequelize(dbConfig.DB, dbConfig.DBUSER, dbConfig.DBPASSWORD, {
    host: dbConfig.DBHOST,
    port: dbConfig.DBPORT,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
sequelize.authenticate().then(() => {
    logger.info(dbConfig.DBHOST + " Database connection has been established successfully.");
}).catch((error) => {
    logger.error("Unable to connect to the database: ", error);
});
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.exampleModel = require("./example.model.js")(sequelize, Sequelize);

module.exports = {
    db
};

