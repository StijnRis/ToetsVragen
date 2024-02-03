var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "questions.db";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
    }
});

module.exports = db;
