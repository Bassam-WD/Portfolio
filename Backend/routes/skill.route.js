const express = require("express")
const router = express.Router();
const Skill = require('../models/skill')


// Get all skills
router.get('', async (req, res) => {
    try {
        const skills = await Skill.find()
        res.status(200).send(skills)
    } catch (error) {
        res.status(500).send(error.message);
    }
})

// Add new skill 
router.post('', async (req, res) => {
    try {
        const createdSkill = await Skill.create(req.body);
        res.status(201).send(createdSkill);
    } catch (error) {
        res.status(500).send(error.message)
    }
})


// Edit Skill 
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const editSkill = await Skill.findByIdAndUpdate(id, req.body, {
            returnDocument: 'after',    // return project after update
            runValidators: true // run schema validators
        })

        if (!editSkill) {
            return res.status(404).send("Skill Not Found");
        }

        res.status(200).send(editSkill)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


// Delete Skill
router.delete("/:id", async (req, res) => {

    try {
        const { id } = req.params
        const skillDeleted = await Skill.findByIdAndDelete(id)

        if (!skillDeleted) {
            return res.status(404).json({ message: "Skill Not Found" })
        }
        res.status(200).json(`Skill "${skillDeleted.name}" Deleted`)

    } catch (error) {
        res.status(500).json(error.message)
    }

})




module.exports = router