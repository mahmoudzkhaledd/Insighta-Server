const mongoose = require('mongoose');

module.exports = async function configDbConnection() {
    const url = process.env.MONGO_URL;
    mongoose.set("strictQuery", false);
    mongoose.connect(url).then(() => {
        console.log("Connected To Database");
    });
    

} 