const mongoose = require('mongoose');


exports.connectMongo = async () => {
    await mongoose.connect(process.env.mongoURL)
        .then(() => console.log("Mongo : Up and running"))
        .catch((error) => console.log("There was an issue connecting to the db : " + error));
}
