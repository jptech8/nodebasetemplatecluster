 const os = require('os');
 var {properties} = require("../../utility/property.utils");
 const isclusterenable = process.env.ISCLUSTERENABLE || properties.get('main.app.isclusterenable')

  module.exports = {
  enabled :isclusterenable ,
  numProcesses : os.cpus().length
}
