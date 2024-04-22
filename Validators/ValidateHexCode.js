module.exports.isValidHexaCode = (str) => {
    let regex = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
    if (str == null) {
        return false;
    }
    return regex.test(str);
}