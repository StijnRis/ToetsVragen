const { findQuestionsInPdf } = require("./question_finder");

describe("Question finder", () => {
    test("Get questions from scheikunde vwo 2023 versie 1", async () => {
        const pdfjsLib = await import("pdfjs-dist");
        const questions = await findQuestionsInPdf(pdfjsLib, "./data/scheikunde-vwo-2023-1.pdf", 1);
        console.log(questions);
    });
});
