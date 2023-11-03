/** 
 * @author Vengatesan Kandasamy
 * @version 3.0.0
 * @copyright KP ORG
* @constant {HTTPSTATUS} refer app.constant to add the additional codes
 */

const {HTTPSTATUS} = require("../constant/app.constant")

class HttpStatus extends Error {
    constructor() {
        super()
    }
    StatusMessage(obj) {

        return {message: obj}
    }
    StatusCode(HTTPSTATUS) {

        return HTTPSTATUS
    }

}

const StatusMessage = (message) => {
    return new HttpStatus().StatusMessage(message)
};
const StatusCode = new HttpStatus().StatusCode(HTTPSTATUS);
module.exports = {
    StatusMessage,
    StatusCode
}

