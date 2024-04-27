const configs = require('../Configs.json');
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
function numOfDate(firstDate, secondDate) {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.floor(Math.abs((firstDate - new Date(secondDate)) / oneDay));
    return diffDays
}


function addView(viewsHistory, increase, maxGraphPoint) {
    const dateNow = new Date();
    const limit = maxGraphPoint ?? Infinity;
    const defLen = maxGraphPoint ?? configs.maxGraphPoint;

    viewsHistory = viewsHistory ?? [];
     if (viewsHistory.length != defLen) {
       
        if (viewsHistory.length == 0) {
            for (let i = 0; i < defLen; i++) {
                const obj = {
                    count: 0,
                    date: dateNow.addDays(i - defLen + 1).toLocaleDateString()
                };
                viewsHistory.push(obj);
            }
        } else if (viewsHistory.length <= defLen) {
            const loop = defLen - viewsHistory.length;
            const firstDate = viewsHistory[0].date;
            for (let i = 1; i <= loop; i++) {
                const obj = {
                    count: 0,
                    date: firstDate.addDays(-1 * i).toLocaleDateString()
                };
                viewsHistory = [obj].concat(viewsHistory);
            }
        } else {
            viewsHistory.splice(0, viewsHistory.length - defLen);
        }
        if (viewsHistory.length != 0) viewsHistory[viewsHistory.length - 1].count += increase;
    } else if (`${dateNow.toLocaleDateString()}`.split('T')[0] == `${viewsHistory[viewsHistory.length - 1].date.toLocaleDateString()}`.split('T')[0]) {
 
        viewsHistory[viewsHistory.length - 1].count += increase;
    } else {
        const diff = numOfDate(dateNow, viewsHistory[viewsHistory.length - 1].date);

        for (let i = 1; i <= diff; i++) {
            const obj = {
                count: 0,
                date: dateNow.addDays(i - diff).toLocaleDateString()
            };
            viewsHistory.push(obj);
            if (viewsHistory.length > limit) viewsHistory.splice(0, 1);
        }
        viewsHistory[viewsHistory.length - 1].count += increase;
    }
    return viewsHistory;
}

function getBrowserName(userAgent) {
    if (userAgent.includes('Chrome')) {
        return 'Google Chrome';
    } else if (userAgent.includes('Firefox')) {
        return 'Mozilla Firefox';
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        return 'Safari';
    } else if (userAgent.includes('Edge')) {
        return 'Microsoft Edge';
    } else if (userAgent.includes('MSIE') || userAgent.includes('Trident/')) {
        return 'Internet Explorer';
    } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
        return 'Opera';
    } else if (userAgent.includes('YaBrowser')) {
        return 'Yandex Browser';
    } else if (userAgent.includes('UCBrowser')) {
        return 'UC Browser';
    } else if (userAgent.includes('SamsungBrowser')) {
        return 'Samsung Internet Browser';
    } else if (userAgent.includes('Brave')) {
        return 'Brave Browser';
    } else if (userAgent.includes('Vivaldi')) {
        return 'Vivaldi';
    } else {
        return null;
    }
}

function getDeviceName(userAgent) {
    if (userAgent == null) return null;
    const browserName = getBrowserName(userAgent);
    if (userAgent.includes('Mobile') && browserName != null) {
        return `${browserName} Mobile`;
    }
    return browserName;
}
function increaseMap(map, key) {
    const count = map.get(key);
    if (count == null) map.set(key, 1);
    else map.set(key, count + 1);
    return map;
}
module.exports = {
    numOfDate,
    addView,
    getBrowserName,
    getDeviceName,
    increaseMap,
}