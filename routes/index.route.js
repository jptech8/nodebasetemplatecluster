/**
 * @example use router to create endpoint GET ,POST, PUT etc
 */


var router = require("express").Router();
const dblogMiddleware = require("../middleware/dblog.service");
const validationMiddleware = require("../middleware/validation.service")
const indexservice = require("../controllers/index.controller.js");
const authMiddleware = require("../middleware/auth.service")

// routes definition

router.use(authMiddleware.verifyToken,dblogMiddleware.dblogMiddleware);
router.get("/authenticate", validationMiddleware.nuidAphaNum,indexservice.getAuth);

// export routes module
module.exports = router
