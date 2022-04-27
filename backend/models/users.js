const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
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
    friend_interest:{
        type: Boolean,
        required: true
    },
    fav_genres:{
        type: [String],
        required: true
    },
    booked_events:{
        type: [Number],
        required: true
    },
    friends:{
        type: Array,
        required: true
    },
    friend_requests:{
        type: [Number],
        required: true
    },
})

module.exports = mongoose.model('User', userSchema);