const mongoose = require('mongoose')

const venueSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    sub_region:{
        type: String,
        required: true
    },
    package:{
        type: Number,
        required: true
    },
    capacity:{
        type: Number,
        required: true
    },
    cancellation_availability:{
        type: Boolean,
        required: true
    },
    timings:{
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('Venue', venueSchema);