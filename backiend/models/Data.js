const mongoose = require('mongoose');

// Define the schema for IoT data
const IoTDataSchema = new mongoose.Schema({
    sensorName: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    
    // You can add more fields based on your IoT data structure
    // timestamp, location, etc.
});

// Create a Mongoose model using the schema
const Data = mongoose.model('IoTData', IoTDataSchema);

module.exports = Data;
