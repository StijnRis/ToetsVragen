const db = require("../db");

module.exports.Question = {
    save: (examId, examPageNumber, questionNumber, question, context) => {
        return new Promise((resolve, reject) => {
            db.all(
                "INSERT INTO question (exam_id, exam_page_number, question_number, question, context) VALUES ($1, $2, $3, $4, $5)",
                [examId, examPageNumber, questionNumber, question, context],
                async (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                }
            );
        });
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
            db.all(
                "SELECT * FROM question WHERE id=$1",
                [id],
                async (err, row) => {
                    if (err) reject(err);
                    resolve(row[0]);
                }
            );
        });
    },

    getByText: (text) => {
        return new Promise((resolve, reject) => {
            db.all(
                "SELECT * FROM question WHERE question LIKE $1 OR context LIKE $1 LIMIT 30",
                ["%" + text + "%"],
                async (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                }
            );
        });
    },

    removeAll: () => {
        return new Promise((resolve, reject) => {
            db.all("DELETE FROM question", [], async (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    },
};
