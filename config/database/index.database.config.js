/**
 * @summary database.config.js used to manage only MSSQL database connection string. 
 *
 */
var {properties} = require("../../utility/property.utils");


dbdetail = {
    DBHOST: process.env.DBHOST || properties.get('database.mssql.dbhost'),
    DBUSER: process.env.DBUSER || properties.get('database.mssql.dbuser'),
    DBPASSWORD: process.env.DBPASSWORD || properties.get('database.mssql.dbpassword'),
    DB: process.env.DB || properties.get('database.mssql.db'),
    DBPORT: process.env.DBPORT || properties.get('database.mssql.dbport'),
    dialect: process.env.DIALECT || properties.get('database.mssql.dialect'),
    dialectOptions: {
       options: { "requestTimeout": 15000 }
    },
    pool: {
        max: 10,
        min: 1,
        acquire: 30000,
        idle: 10000
    }
}

module.exports = {
    dbdetail,

}

