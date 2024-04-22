module.exports.validateCuid = (cuidString, safe) => {
    const cuidRegex = /^c[a-z0-9]{24}$/;
    if (safe == true) {
        return cuidRegex.test(cuidString);
    }
    if (cuidString == null) {
        throw new Error("Please provide a valid id");
    }

    if (!cuidRegex.test(cuidString)) throw new Error("Please provide a valid id");
    return true;
}