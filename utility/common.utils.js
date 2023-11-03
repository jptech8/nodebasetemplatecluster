function responseAddons(response) {
    return { ...response, timestamp: new Date()}
}
const removeEmptyValues = (object) => object.map(item => {
    const { [""]:key1, ...userWithoutGroup } = item
    return userWithoutGroup
} )
module.exports = {
    responseAddons,
    removeEmptyValues
}