const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    shortDescription: {
        type: String,
        required: true,
        trim: true,
        maxlength: 160

    },
    fullDescription: {
        type: String,
        trim: true,
    },
    techStack: [{ type: String, trim: true }],
    coverImage: {
        name: {
            type: String,
            required: [true, "Cover Image is required"],
            trim: true
        },
        size: {
            type: Number
        },
        url: {
            type: String,
            trim: true,

        },
    },
    liveUrl: {
        type: String,
        trim: true,
    },

    githubUrl: {
        type: String,
        trim: true,
    },

    isPublished: {
        type: Boolean,
        default: false,
    },
    inHome: {
        type: Boolean,
        default: false,
    }


})

module.exports = mongoose.model("Project", projectSchema)