/**
 * @constant TABLE - table.constant.js is configuarable to use it to get table name to refer more than once operation 
 *
 */
const TABLE = require("../constant/table.constant")
module.exports = (sequelize, Sequelize) => {
    const exampleModel = sequelize.define(TABLE.MAPS_TABLE, {
        uid: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            autoIncrementIdentity: true
        }
    }, {
        timestamps: false
    }, {
        tableName: TABLE.MAPS_TABLE
    }, {
      freezeTableName: true
    });
    return exampleModel;
};

