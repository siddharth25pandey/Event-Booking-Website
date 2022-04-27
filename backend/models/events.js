const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    feedback:{
        type: Array,
        required: true
    },
    is_popular:{
        type: Boolean,
        required: true
    },
    duration:{
        type: String,
        required: true
    },
    about:{
        type: String,
        required: true
    },
    genre:{
        type: Array,
        required: true
    },
    banner_image_url:{
        type: String,
        required: true
    },
    languages:{
        type: String,
        required: true
    },
    grade:{
        type: String,
        required: true
    },
    rating:{
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    is_premier:{
        type: Boolean,
        required: true
    },
    release_date:{
        type: String,
        required: true
    },
    cast:{
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('Event', eventSchema);