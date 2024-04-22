const Reader = require('@maxmind/geoip2-node').Reader;



module.exports.getUserCountry = async (ip) => {
    try {
        const reader = await Reader.open('GeoLite2-Country.mmdb');
        const response = reader.country(ip);
        return response.country.names.en;
    } catch (ex) {
        return null;
    }
};
