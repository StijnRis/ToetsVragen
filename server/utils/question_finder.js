const { Exam } = require("../models/exam");
const { Question } = require("../models/question");

async function findQuestions() {
    await Question.removeAll();
    const pdfjsLib = await import("pdfjs-dist");
    const exams = await Exam.getAll();
    for (const exam of exams) {
        console.log(`Checking exam ${exam.id}`);
        const questions = await findQuestionsInPdf(
            pdfjsLib,
            exam.file_path,
            exam.id
        );
        await saveQuestions(questions);
    }
}

async function findQuestionsInExam(pdfjsLib, exam) {
    const text = await extractText(pdfjsLib, exam.file_path);
    const questions = findQuestionsInText(exam.id, text);
    await saveQuestions(questions);
}

async function findQuestionsInPdf(pdfjsLib, pdfPath, examId) {
    const pdf = await pdfjsLib.getDocument(pdfPath).promise;
    const totalPageCount = pdf.numPages;
    const questions = [];

    let currentPoints = null;
    let currentQuestionNumber = null;
    let currentText = "";
    let currentContext = "";
    let isQuestionText = false;

    for (let currentPage = 1; currentPage <= totalPageCount; currentPage++) {
        const page = await pdf.getPage(currentPage);
        const textContent = await page.getTextContent();
        for (const item of textContent.items) {
            const text = item.str;
            const points = text.match(/^([1-9][0-9]*) {0,1}p$/m);
            const quesiontNumber = text.match(/^([1-9][0-9]*)$/m);
            if (points !== null) {
                currentPoints = parseInt(points[1]);
                isQuestionText = true;
            } else if (
                quesiontNumber !== null &&
                currentPoints !== null &&
                currentQuestionNumber === null
            ) {
                currentQuestionNumber = parseInt(quesiontNumber[1]);
            } else if (
                text === "" &&
                item.hasEOL == true &&
                currentText !== ""
            ) {
                questions.push({
                    examPageNumber: currentPage,
                    examId: examId,
                    points: currentPoints,
                    questionNumber: currentQuestionNumber,
                    question: currentText.trim(),
                    context: currentContext.trim(),
                });
                currentPoints = null;
                currentQuestionNumber = null;
                currentText = "";
                currentContext = "";
                isQuestionText = false;
            } else if (isQuestionText && currentQuestionNumber !== null) {
                currentText += text;
                if (item.hasEOL) {
                    currentText += "\n";
                }
            } else {
                currentContext += text;
            }
        }
    }
    return questions;
}

module.exports.findQuestionsInPdf = findQuestionsInPdf;

async function extractText(pdfjsLib, pdfPath) {
    let pdf = await pdfjsLib.getDocument(pdfPath).promise;
    let text = "";
    let totalPageCount = pdf.numPages;
    for (let currentPage = 1; currentPage <= totalPageCount; currentPage++) {
        let page = await pdf.getPage(currentPage);
        let textContent = await page.getTextContent();
        for (const item of textContent.items) {
            console.log(item);
            text += item.str;
            if (item.hasEOL) {
                text += "\n";
            }
        }
        text += `\n {{webpage ${currentPage + 1}}}`;
    }
    return text;
}

function findQuestionsInText(examId, text) {
    const regex =
        /\n([0-9])p ([0-9]+)([\s\S]+?) *?(?=(\n *\n|\n[0-9]p|$(?![\r\n])))/gm;
    const matches = text.matchAll(regex);
    const questions = [];
    let pageNumber = 1;
    for (const match of matches) {
        const result = match[0].match(/{webpage (\d+)}/);
        if (result != null) {
            pageNumber = parseInt(result[1]);
        }

        questions.push({
            examPageNumber: pageNumber,
            examId: examId,
            points: parseInt(match[1]),
            questionNumber: parseInt(match[2]),
            question: match[3],
            context: "",
        });
    }
    return questions;
}

async function saveQuestions(questions) {
    for (const questionData of questions) {
        await Question.save(
            questionData.examId,
            questionData.examPageNumber,
            questionData.questionNumber,
            questionData.question,
            questionData.context
        );
    }
}

module.exports.findQuestions = findQuestions;
