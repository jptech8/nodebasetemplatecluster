var {properties} = require("../utility/property.utils")

module.exports = {
    DB_SP: {
        SP_AUTHENTICATE: properties.get('sp.sp_authenticate')
    },
    DB_QUERY:{
        QUERY_EXAMPLE:properties.get('query.query_example')
        
    }
}
