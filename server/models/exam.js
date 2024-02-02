const db = require("../db");

module.exports.Exam = {
    save: (url, level, year, version, filePath) => {
        return new Promise((resolve, reject) => {
            db.all(
                "INSERT INTO exam (url, level, year, version) VALUES ($1, $2, $3, $4, $5)",
                [url, level, year, version, filePath],
                async (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                }
            );
        });
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM exam WHERE id=$1", [id], async (err, row) => {
                if (err) reject(err);
                resolve(row[0]);
            });
        });
    },

    getAll: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM exam", [], async (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    },

    removeAll: () => {
        return new Promise((resolve, reject) => {
            db.all("DELETE FROM exam", [], async (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    },
};
