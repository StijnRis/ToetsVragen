const { Exam } = require("../models/exam");
const { Question } = require("../models/question");

async function findQuestions() {
    await Question.removeAll();
    const pdfjsLib = await import("pdfjs-dist");
    const exams = await Exam.getAll();
    for (const exam of exams) {
        await findQuestionsInExam(pdfjsLib, exam);
    }
}

async function findQuestionsInExam(pdfjsLib, exam) {
    console.log(`Checking exam ${exam.id}`);
    const text = await extractText(pdfjsLib, exam.file_path);
    const questions = findQuestionsInText(exam.id, text);
    await saveQuestions(questions);
}

async function extractText(pdfjsLib, pdfPath) {
    let pdf = await pdfjsLib.getDocument(pdfPath).promise;
    let text = "";
    let totalPageCount = pdf.numPages;
    for (let currentPage = 1; currentPage <= totalPageCount; currentPage++) {
        let page = await pdf.getPage(currentPage);
        let textContent = await page.getTextContent();
        for (const item of textContent.items) {
            text += item.str;
            if (item.hasEOL) {
                text += "\n";
            }
        }
        text += `\n {{webpage ${currentPage}}}`;
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
