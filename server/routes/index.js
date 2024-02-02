var express = require("express");
var router = express.Router();

var apiRouter = require("./api/index");
const { findQuestions } = require("../utils/question_finder");
const { findExams } = require("../utils/exam_finder");

router.use("/api", apiRouter);

router.get("/findExams", async function (req, res, next) {
    res.write("Finding exams...");
    await findExams();
    res.write("Done?");
    res.end();
});

router.get("/findQuestions", async function (req, res, next) {
    res.write("Finding Questions...");
    await findQuestions();
    res.write("Done?");
    res.end();
});

module.exports = router;
