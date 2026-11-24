const mongoose = require('mongoose')


const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    icon: {
        type: String,
        trim: true
    },
    isVisible: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("skill", skillSchema)