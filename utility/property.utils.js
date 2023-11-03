var PropertiesReader = require('properties-reader');
var propertypath = ""
var fs = require('fs')

if (!fs.existsSync(propertypath)) {
  
    if(!process.env.NODE_ENV ){
        console.info('{"name":"api-nodejs-apps","level":"info","msg": "Please set environment variable, now it is with default configuration as it has no NODE_ENV set"}')
        process.env.NODE_ENV='dev'
         }
    
    var propertypath = `./config/${process.env.NODE_ENV}/config.properties`
}

var properties = new PropertiesReader(propertypath)
module.exports = {
    properties
}
