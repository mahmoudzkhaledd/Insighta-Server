
const { subscriptionSchema } = require("../../Schemas/SubscriptionSchema")
const { appAxios } = require("../../Utils/AppAxios")

module.exports.getUserSubscription = async (userId) => {
    try {
        const res = await appAxios.get(`/subscriptions/user-subscription?userId=${userId}&includePkg=true`);
        console.log('object');
        const model = subscriptionSchema.parse(JSON.parse(res.data).subscription);
        return model;
    } catch (ex) {
        console.log({ err: ex });
        return null;
    }
};