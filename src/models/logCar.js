const mongoose = require('mongoose')

const { Schema } = mongoose

const logCar = new Schema({
    car_id: {
        type: Schema.Types.ObjectId,
    },
    data_hora: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("logCar", logCar)