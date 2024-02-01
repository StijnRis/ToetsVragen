const express = require("express");
const Question = require("../models/question");
const router = express.Router();

/**
 * Get question by id
 */
router.get("/:id", async (req, res, next) => {
    const {id} = req.params;
    
    const result = await Question.getById(id);

    if (!result) {
        res.status(404).json({ error: "Question does not exist." });
        return;
    }

    res.send(result);
});

/**
 * Get questions with filter
 */
router.get("/", async (req, res, next) => {
    const {text} = req.query;
    
    const result = await Question.getByText(text);

    if (result.length == 0) {
        res.status(404).json({ error: "No questions found." });
        return;
    }

    res.send(result);
});

module.exports = router