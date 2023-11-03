const {StatusMessage,StatusCode} = require("../utility/httpcode.utils.js")
const nuidAphaNum = (req, res, next) => {

    let { nuid } = req.headers;
    if (nuid && !nuid.match('^[A-Za-z]{1}[0-9]{6}$')) {
        return res.status(StatusCode.BAD_REQUEST).json(StatusMessage("Please enter a valid NUID.") )
    }

    next()
}
module.exports = {

    nuidAphaNum
}

