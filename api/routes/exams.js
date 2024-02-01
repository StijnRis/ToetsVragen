const express = require("express");
const Question = require("../models/question");
const Exam = require("../models/exam");
const router = express.Router();

/**
 * Get exam by id
 */
router.get("/:id", async (req, res, next) => {
    const {id} = req.params;
    
    const result = await Exam.getById(id);

    if (!result) {
        res.status(404).json({ error: "Exam does not exist." });
        return;
    }

    res.send(result);
});

module.exports = router