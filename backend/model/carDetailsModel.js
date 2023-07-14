const mongoose = require("mongoose")

const carSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    milage: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    availableFrom: {
        type: String
    },
    availableTill: {
        type: String
    },
    perKm: {
        type: String
    },
    description: {
        type: String
    },
    carDetails: {
        type: String
    },
    Details: {
        type: String
    },
    AdminId: {
        type:String
    }
})

const carDetails = new mongoose.model("CarDetails", carSchema)

module.exports = carDetails