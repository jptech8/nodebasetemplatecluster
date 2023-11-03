var {
    issueToken,
    verifyToken
} = require("../middleware/auth.service")

const authService = (req, res,next)=>{
    let tokenGenerate = {
        nuid: req.body.nuid || req.headers.nuid,
        acaToken: req.body.acatoken || req.headers.acatoken
    }
    if (tokenGenerate.nuid !== '' && tokenGenerate.nuid != undefined) {
        const token = issueToken(req, res, next, tokenGenerate)
        return token

}
else {
    res.status(StatusCode.BAD_REQUEST).send(StatusMessage("Invalid header and body to generate JWT token"))
}
}


module.exports = {
    authService

};