
exports.validateUrl = async (req, res, next) => {
    let url = `${req.body.url}`;
    url = url.replace(/\/+$/, '');
    url = url.replace(/([^:]\/)\/+/g, '$1');
    url = url.replace(/(https?:\/\/.*?)\/+/g, '$1/');
    url = url.replace(/(http?:\/\/.*?)\/+/g, '$1/');
    req.body.url = url;
    next();
}
