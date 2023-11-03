var bunyan = require('bunyan');
var CONSTANT = require("../constant/app.constant")
function modifiedStream() {
    return {
        write: log => {
            log.level = bunyan.nameFromLevel[log.level];
            log.time =new Date().toLocaleString();
            var logLine = JSON.stringify(log, bunyan.safeCycles());
            console.log(logLine);
        }
    };
}

var log = bunyan.createLogger({
    name: CONSTANT.APPNAME,
    streams: [
        {
            level: 'info',
            type: 'raw',
            stream: modifiedStream()
        }
    ]
});
delete log.fields.hostname;
delete log.fields.pid;

module.exports = log;

