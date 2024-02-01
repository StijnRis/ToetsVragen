const db = require("../db");

module.exports = {
    getById: (id) => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM exam WHERE id=$1", [id], async (err, row) => {
                if (err) reject(err);
                resolve(row[0]);
            });
        });
    },
};

