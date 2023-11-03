const axios = require("axios");
const API = require("../constant/app.constant");
const CONSTANT = require("../constant/app.constant")
var date = new Date().toLocaleString()
var logger = require("../utility/logger.utils")
const dblogMiddleware = async (req, res, next) => {
    var data = {
        header: {
            nuid: req.nuid || req.headers.nuid || "",
            tokenId: req.body.jwttoken || req.headers.authorization || "",
            httpMethod: req.method,
            service: req.originalUrl
        },
        body: {
            request: "requestBody :"+ JSON.stringify(req.body || "No Request body") + " " +"requestHeader :"+ JSON.stringify(req.headers || "No Request Headers")
        }
    };
logger.info("dblog1:",data);
    await axios.post(API.DBLOGGER_API, {
        request: data.body.request
    }, {headers: data.header}).then(function (res) { 
        logger.info("UID:",res.data.uid);
        req.uid = res.data.uid;
    }).catch(function (err) {
      logger.error(err.message);
    });
    if (req.uid) {
       
        var send = res.send;
        res.send = async function (body) {
            res.locals.body = body

            send.call(this, body);


            if (res.statusCode != 200 && res.statusCode != 202 ) {
                res.errorcode = res.statusCode;
                res.message = "failed"
            } else {
                res.errorcode = Number(null);
                res.message = JSON.stringify({status: "OK", start_ts: date})
            }

            
            var data = {
                header: {
                    nuid: req.nuid||req.headers.nuid || " No Nuid in header or JWT " ,
                    tokenId: req.body.jwttoken || req.headers.authorization || " No Jwt Authorization in Header and Body",
                    message: res.statusMessage,
                    service: req.originalUrl,
                    errorcode: res.errorcode,
                    uid: req.uid
                },
                body: {
                    response: res.locals.body
                }
            };
             logger.info("dblog2:",data);
            await axios.put(API.DBLOGGER_API, {
                response: data.body.response
            }, {headers: data.header}).then(function (res) {
                logger.info("updated logs success"); 
            }).catch(function (err) {
                logger.error(err.message);
            });
        }
    }

    next()
};
module.exports = {
    dblogMiddleware
};

