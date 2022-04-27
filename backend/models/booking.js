const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    date:{
        type: Number,
        required: true
    },
    day:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    venues_name:{
        type: String,
        required: true
    },
    silver:{
        type: [String],
        required: true
    },
    platinium:{
        type: [String],
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    total_price:{
        type: Number,
        required: true
    },
    banner_image_url:{
        type: String,
        required: true
    },
    grade:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Booking', bookingSchema);