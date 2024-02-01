const db = require("../db");

module.exports = {
    getById: (id) => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM question WHERE id=$1", [id], async (err, row) => {
                if (err) reject(err);
                resolve(row[0]);
            });
        });
    },

    getByText: (text) => {
        return new Promise((resolve, reject) => {
            console.log(text)
            db.all("SELECT * FROM question WHERE question LIKE $1 OR context LIKE $1 LIMIT 30", ["%"+text+"%"], async (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    },
};

