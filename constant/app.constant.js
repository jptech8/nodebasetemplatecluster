 var {properties} = require("../utility/property.utils")
 const HTTPSTATUS = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    CREATED:202
}

module.exports = {
    HTTPSTATUS:HTTPSTATUS,
    DATE: new Date().toLocaleString(),
    APPNAME: properties.get('main.app.appname'),
    PORT: properties.get('main.app.port'),
    APIURL_VERSION: properties.get('main.app.apiurl_version'),
    JWTSECRET_KEY:properties.get('main.app.jwtsecret_key'),
    JWTSECRET_EXPTIME:properties.get('main.app.jwtsecret_exptime'),
    DBLOGGER_API: properties.get('main.app.dblogger_api'),
    OPENAPIDOCS_PATH:properties.get('main.app.openapidocs_path'),
} 