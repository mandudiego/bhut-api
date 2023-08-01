const mongoose = require('mongoose')

const { Schema } = mongoose

const logCar = new Schema({
    data_hora: {
        type: Date,
        default: Date.now,
    },
    car_id: {
        type: Number,
    }
})

module.exports = mongoose.model("logCar", logCar)