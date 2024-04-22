
function sanatizeObject(object) {
    for (const k of Object.keys(object)) {
        if (typeof object[k] == 'object') {
            sanatizeObject(object[k]);
        } else if (typeof object[k] == 'string') {
            object[k] = object[k].trim();

        }
    }
    return object;
}
function customSanatize(object) {
    if (typeof object == 'string') {
        object = object.trim();
        return object
    } else if (typeof object == 'object') {
        return sanatizeObject(object)
    }
    return object;
}


module.exports.trimRequest = () => {
    return (req, res, next) => {

        if (req?.body == null) return next();
        req.body = customSanatize(req.body);
        next();
    };
};