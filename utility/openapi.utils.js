const CONSTANT = require('../constant/app.constant')
const logger = require("./logger.utils");
const swaggerUi = require('swagger-ui-express');
const fs = require("fs")
const YAML = require('yaml');

const openAPIRouter = () => {
    if (fs.existsSync(CONSTANT.OPENAPIDOCS_PATH)) {
        const file = fs.readFileSync(CONSTANT.OPENAPIDOCS_PATH, 'utf8')
        const swaggerDocument = YAML.parse(file)
        return {
            serve: swaggerUi.serve,
            docPath: swaggerUi.setup(swaggerDocument)
        }


    } else {
        logger.error("Open API file is not available.Please place openapi.docs.yaml under .openapi folder")
    }
}

module.exports = {
    openAPIRouter
};