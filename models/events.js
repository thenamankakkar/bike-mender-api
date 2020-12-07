// app/models/bear.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stationSchema = new Schema({
    station_name: String,
    station_address: String,
    station_number: String,
});

module.exports = mongoose.model('station', stationSchema);

