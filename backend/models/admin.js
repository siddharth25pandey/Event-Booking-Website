const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Admin', adminSchema);