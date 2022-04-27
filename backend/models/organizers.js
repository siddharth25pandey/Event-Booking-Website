const mongoose = require('mongoose')

const organizerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    about:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    organized_events:{
        type: [Number],
        required: true
    }
})

module.exports = mongoose.model('Organizer', organizerSchema);