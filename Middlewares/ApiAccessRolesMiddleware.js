const configs = require('../Configs.json');



module.exports.apiAccessRolesValidator = (requiredRoles = []) => {
    if (requiredRoles.length == 0) {
        throw new Error(`Required roles is empty`);
    }
    for (const role of requiredRoles) {
        if (!configs.apiKeyAccess.includes(role)) {
            throw new Error(`Role ${role} is not in the roles array`);
        }
    }

    return (req, res, next) => {

        const apiKey = res.locals.apiKeyModel.key;
        if (apiKey.access === configs.apiFullAccessKey) return next();
        if (!requiredRoles.includes(apiKey.access)) {
            return res.status(400).json({
                msg: "You are not allowed to do this operation",
            });
        }
        return next();
    };
}