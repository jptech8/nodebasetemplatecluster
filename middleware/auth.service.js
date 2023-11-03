const jwt = require("jsonwebtoken");
const KEY = require("../constant/app.constant")
var logger = require("../utility/logger.utils")
const CONSTANT = require("../constant/app.constant")
const {StatusMessage,StatusCode} = require("../utility/httpcode.utils.js")
const issueToken = (req, res, next, tokenGenerate) => {

    let JwtToken = jwt.sign({
        jwt: tokenGenerate
    }, process.env.TOKEN_KEY || KEY.JWTSECRET_KEY, {expiresIn: process.env.JWTSECRET_EXPTIME || KEY.JWTSECRET_EXPTIME})
    logger.info(JwtToken)
    return JwtToken;
};
const verifyToken = (req, res, next) => {
    if (req.url!="/authenticate"){
    let authheader = req.headers.authorization;
    if (! authheader) {
        logger.error("Authorization required.")
        return res.status(StatusCode.FORBIDDEN).json(StatusMessage({"name": CONSTANT.APPNAME, "level": "error", "msg": "Authorization required.", "time": CONSTANT.DATE}));
    }
    let token;
    if (authheader && authheader.startsWith('Bearer')) {
        token = authheader.split(' ')[1];
    }
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY || KEY.JWTSECRET_KEY,);
        logger.info("Token:",token)
        req.nuid = decodedToken.jwt.nuid.trim();
        console.log("req.nuid in auth)",req.nuid)
         //return req.nuid;

    } catch (err) {
        logger.error("Token invalid")
        return res.status(StatusCode.UNAUTHORIZED).json(StatusMessage({"name": CONSTANT.APPNAME, "level": "error", "msg": "Token invalid", "time": CONSTANT.DATE}));
    }
   
}
next();
};

module.exports = {
    verifyToken,
    issueToken
};

