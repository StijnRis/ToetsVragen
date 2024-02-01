var express = require('express');
var router = express.Router();

var questionsRouter = require("./questions");
var examRouter = require("./exams");

router.use("/questions", questionsRouter);
router.use("/exams", examRouter);

module.exports = router;
