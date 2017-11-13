const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const DB_URI = `mongodb://${process.env.MONGO_HOST}/mappa`;

mongoose.connect(DB_URI, {
    useMongoClient: true,
});

const vehicleSchema = mongoose.Schema({
    id: {
        type: String,
        index: true,
        unique: true,
    },
    locations: [{lat: Number, lng: Number, at: Date,}],
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = {
    Vehicle,
};