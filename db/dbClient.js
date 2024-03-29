const mongoose = require('mongoose');

const mongoURL = process.env.mongoURL;

connectMongo = () => {
    mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
        .then(() => console.log("Mongo : Up and running"))
        .catch((error) => console.log("There was an issue connecting to the db : " + error));
}

