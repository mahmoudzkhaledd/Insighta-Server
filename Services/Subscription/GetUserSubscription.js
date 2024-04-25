
const { subscriptionSchema } = require("../../Schemas/SubscriptionSchema")
const { appAxios } = require("../../Utils/AppAxios")

module.exports.getUserSubscription = async (userId) => {
    try {
        const res = await appAxios.get(`/subscriptions/user-subscription?userId=${userId}&includePkg=true`);
        const json = JSON.parse(res.data);
        if (json.expired == true) {
            return null;
        }
        const model = subscriptionSchema.parse(json.subscription);

        return model;
    } catch (ex) {
        return null;
    }
};