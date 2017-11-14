const mongoose = require('mongoose');

const DATABASE = process.env.APP_ENV === 'test' ? 'test': 'mappa';
const DB_URI = `mongodb://${process.env.MONGO_HOST}/${DATABASE}`;

mongoose.connect(DB_URI, {
    useMongoClient: true,
});

const vehicleSchema = mongoose.Schema({
    id: {
        type: String,
        index: true,
        unique: true,
    },
    locations: [{ lat: Number, lng: Number, at: Date }],
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = {
    Vehicle,
};