const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");

const upload = require("../middleware/Upload");
const { toFileData, removeFile } = require('../Controllers/handelFiles')



// Get profile data 

router.get('', async (req, res) => {

    try {
        const profile = await Profile.findOne();
        res.status(200).send(profile)
    } catch (error) {
        res.status(500).send(error.message)
    }

})



// profile Edit add 

router.patch('',
    upload.fields([
        { name: 'profileImage', maxCount: 1 },
        { name: 'cvFile', maxCount: 1 },
    ]),
    async (req, res) => {

        try {
            const update = { ...req.body }
            const files = req.files || {}


            if (files.profileImage) update.profileImage = toFileData(files.profileImage[0]);
            if (files.cvFile) update.cvFile = toFileData(files.cvFile[0]);

            const oldProfile = await Profile.findOne();

            const profile = await Profile.findOneAndUpdate({}, update, {
                returnDocument: 'after',
                upsert: true, // if no document creat it ---- if document update it
                runValidators: true,
            })

            // remove old files
            if (files.profileImage) removeFile(oldProfile?.profileImage);
            if (files.cvFile) removeFile(oldProfile?.cvFile);

            res.status(200).send(profile)
        } catch (error) {
            res.status(500).send(error.message)
        }
    })




module.exports = router