

module.exports.replaceVariablesWithParameters = (inputString, replacementObject) => {
    var regex = /{{(.*?)}}/g;
    var replacedString = inputString.replace(regex, function (match, p1) {
        var variableName = p1.trim();
        if (replacementObject.hasOwnProperty(variableName)) {
            return replacementObject[variableName];
        } else {
            return match;
        }
    });
    return replacedString;
}

module.exports.extractKeys = (inputString, safe = true) => {
    var regex = /{{(.*?)}}/g;
    var keys = [];
    var match;
    while ((match = regex.exec(inputString)) !== null) {
        var key = match[1].trim()
        if (key.length > 20) {
            throw new Error("Please enter parameters with length less than 20");
        }
        if (key != "")
            keys.push(key);
    }
    if (!safe) {
        const obj = {};
        for (const x of keys) {
            if (obj[x] == null) {
                obj[x] = true;
            } else {
                throw new Error(`${x} is declared twice in the schema!`);
            }
        }
    }
    return keys;
}