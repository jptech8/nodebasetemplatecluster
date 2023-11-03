/**
 * @function create - used to access in route and contains the business logic
 *
 */
const fs = require("fs");
const db = require("../models");
const {DB_SP,DB_QUERY} = require("../constant/query.constant")
const {contacts} = require("../constant/app.constant")
const example = db.db.exampleModel;
const sequelize = db.db.sequelize
const Op = db.db.Sequelize.Op;
const {removeEmptyValues} = require("../utility/common.utils")
const CONSTANT = require("../constant/app.constant")
const {StatusMessage,StatusCode} = require("../utility/httpcode.utils.js")
const {authService} =require('../services/index.service')
// authenticate controller
const getAuth = async (req, res,next) => {

   const token = await authService(req,res,next)
        if (token) {
            
                const storeProcedure = DB_SP.SP_AUTHENTICATE + " " + req.headers.nuid
                sequelize.query(storeProcedure).then(function (response) {
                    const validData = removeEmptyValues(response[0])
                    data = {
                        jwt: token,
                        access: validData,
                    }
                    res.status(StatusCode.OK).json(data);
                }).catch((error) => {
                    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({message: error})
                })
        } else {
            res.status(StatusCode.UNAUTHORIZED).json(StatusMessage("Error Generating the JWT token"))
        }
}


module.exports = {
    getAuth

};

