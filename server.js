/** 
 * @author Vengatesan Kandasamy
 * @version 1.0.0
 * @copyright KP ORG
 * @constant {PORT} 
 * @module Seqelizer - MSMSQL database library
 * @module bunyan - for monitoring apps logs 
 * @module express  - Lightweight API framework 
 */
 const express = require("express");
 const CONSTANT = require('./constant/app.constant')
 const bodyParser = require("body-parser");
 const cors = require("cors");
 const app = express();
 const router = require("./routes/index.route");
 const PORT = process.env.PORT || CONSTANT.PORT;
 const logger = require("./utility/logger.utils");
 const { openAPIRouter } = require("./utility/openapi.utils");
 
 // Cors Origin config
 var corsOptions = {
     origin: '*'
 };
 app.use(cors(corsOptions));
 app.use(bodyParser.json());
 app.use(express.json());
 app.use(express.urlencoded({
     extended: false
 }));
 
 app.get(CONSTANT.APIURL_VERSION + "/ping", (req, res) => {
     res.json({
         message: CONSTANT.APPNAME,
         "time": new Date().toLocaleString()
     });
 });
 
 app.use(CONSTANT.APIURL_VERSION + "/api-docs", openAPIRouter().serve, openAPIRouter().docPath);
 app.get(CONSTANT.APIURL_VERSION + "/load-test", (req, res) => {
    let total = 0;
    for (let i = 0; i < 5_000_000; i++) {
      total++;
    }
    res.send(`The result of  task is ${total}\n`);
  
});
 // set port, listen for requests
 app.use(CONSTANT.APIURL_VERSION, router);
 // Express creating server
 app.listen(PORT, () => {
     logger.info(`The ${process.env.NODE_ENV} Server running on  http://localhost:${PORT}${CONSTANT.APIURL_VERSION}`)
 });
 