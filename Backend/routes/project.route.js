const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const Upload = require("../middleware/Upload");

const { toFileData, removeFile } = require('../Controllers/handelFiles')

const fs = require('fs');




// get All projects
router.get('', async (req, res) => {
    try {
        const projects = await Project.find()
        res.status(200).send(projects)
    } catch (error) {
        res.status(500).send(error.message)
    }
})



// Add new Project
router.post('', Upload.single("coverImage"), async (req, res) => {
    try {


        const data = req.body
        const file = req.file

        if (file) data.coverImage = toFileData(file)

        const createdProject = await Project.create(data);

        res.status(201).send(createdProject)
    } catch (error) {
        if (req.file) fs.unlink(req.file.path, () => { });
        res.status(500).send(error.message)
    }
})




// Edit Project
router.patch('/:id', Upload.single("coverImage"), async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const file = req.file

        if (file) data.coverImage = toFileData(file)

        const oldProject = await Project.findById(id)

        let project = await Project.findByIdAndUpdate(id, data, {
            returnDocument: 'after',    // return project after update
            runValidators: true // run schema validators
        })

        if (file) removeFile(oldProject?.coverImage)


        if (!project) {
            if (req.file) fs.unlink(req.file.path, () => { });
            return res.status(404).send("Project Not Found")
        }

        res.status(200).send(project)

    } catch (error) {
        if (req.file) fs.unlink(req.file.path, () => { });
        res.status(500).send(error.message)

    }
})



// delete Project
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const project = await Project.findByIdAndDelete(id);

        if (!project) {
            return res.status(404).send("Project Not Found")
        }

        removeFile(project.coverImage)
        res.status(200).send(`Project "${project.title}" deleted`)

    } catch (error) {
        res.status(500).send(error.message)
    }
})


module.exports = router