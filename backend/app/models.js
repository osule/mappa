const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

mongoose.connect(`mongodb://localhost/mappa`, {
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

const Vehicle = mongoose.model('Kitten', vehicleSchema);

module.exports = {
    Vehicle,
};