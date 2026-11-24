const mongoose = require('mongoose')




const fileSchema = new mongoose.Schema(
    {
        name: { type: String, trim: true },
        size: { type: Number, min: 0 },
        url: { type: String, trim: true, },
    },
    { _id: false }



)

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Full name is required"],
        trim: true,
        maxlength: 80,
    },
    jobTitle: {
        type: String,
        required: [true, "Job title is required"],
        trim: true,
        maxlength: 80,
    },
    location: {
        type: String,
        trim: true,

    },

    shortBio: {
        type: String,
        required: [true, "Short bio is required"],
        trim: true,
        maxlength: [160, "Short bio must be 160 characters or less"],

    },

    about: {
        type: String,
        required: [true, "About is required"],
        trim: true,
    },


    socialLinks: {
        github: { type: String, trim: true, },
        linkedin: { type: String, trim: true, }
    },

    contactEmail: {
        type: String,
        required: [true, "Contact email is required"],
        trim: true,
        lowercase: true,
    },

    profileImage: fileSchema,

    cvFile: fileSchema,

    isAvailable: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model("profile", profileSchema)