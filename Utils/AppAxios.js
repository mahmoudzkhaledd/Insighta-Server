const AxiosModel = require('axios').Axios;
const crypto = require('crypto');

const axios = new AxiosModel({
    baseURL: `${process.env.NEXT_URL}/api/server`,
    "headers": {
        "Content-Type": "application/json"
    }
});
axios.interceptors.request.use(req => {
    req.headers.set("Cache-Control", "max-age=60");
    const key = process.env.API_SECRET ?? "";
    const nodePublicKey = process.env.NEXT_PUBLIC_KEY ?? "";
    const hashed = crypto.publicEncrypt(nodePublicKey, Buffer.from(key)).toString('base64');

    req.headers.set("api-secret", hashed);
    return req;
})
module.exports.appAxios = axios;