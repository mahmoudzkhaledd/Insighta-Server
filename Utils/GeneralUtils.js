exports.toNumber = (n) => {
    return (!isNaN(parseFloat(n)) && !isNaN(n - 0)) ? parseFloat(n) : null;
}
exports.toInt = (n) => {
    return (!isNaN(parseInt(n)) && !isNaN(n - 0)) ? parseInt(n) : null;
}