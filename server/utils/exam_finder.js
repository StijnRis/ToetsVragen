const fs = require("fs");
const path = require("path");
// const axios = require("axios");
const { Exam } = require("../models/exam");
const https = require("https");

async function findExams() {
    const folder ="../data";
    await Exam.removeAll();
    await clearFolder(folder);
    await findAndDownloadAllNvonExams(folder);
}

async function clearFolder(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(directory, file), (err) => {
                if (err) throw err;
            });
        }
    });
}

async function findAndDownloadAllNvonExams(folder) {
    const urls = [
        {
            level: "vmbo",
            subject: "scheikunde",
            url: "https://newsroom.nvon.nl/files/default/skc{name}vb.pdf",
        },
        {
            level: "vmbo",
            subject: "scheikunde",
            url: "https://newsroom.nvon.nl/files/default/nask2tl{name}vb.pdf",
        },
        {
            level: "havo",
            subject: "scheikunde",
            url: "https://newsroom.nvon.nl/files/default/skh{name}vb.pdf",
        },
        {
            level: "vwo",
            subject: "scheikunde",
            url: "https://newsroom.nvon.nl/files/default/skv{name}vb.pdf",
        },
    ];

    const currentYear = new Date().getFullYear();

    for (let year = 2000; year < currentYear; year++) {
        for (let version = 1; version <= 2; version++) {
            const yearId = String(year).slice(-2) + String(version);

            for (const urlItem of urls) {
                const url = urlItem.url.replace("{name}", yearId);
                const level = urlItem.level;
                const subject = urlItem.subject;
                const file = `${subject}-${level}-${year}-${version}.pdf`;
                const filePath = path.join(folder, file);

                console.log(`Downloading ${url} to ${file}`);

                try {
                    const file = fs.createWriteStream(filePath);
                    const request = https.get(url, function (response) {
                        response.pipe(file);
                        file.on("finish", () => {
                            file.close();
                            console.log("Download Completed");
                        });
                    });
                    // const response = await axios.get(url, {
                    //     responseType: "arraybuffer",
                    // });

                    // if (response.status === 404) {
                    //     console.log("PDF was not found");
                    //     continue;
                    // }

                    // fs.writeFileSync(filePath, response.data);

                    await Exam.save(url, level, year, version, filePath);
                } catch (error) {
                    console.error(`Error downloading file: ${error}`);
                }
            }
        }
    }
}

module.exports.findExams = findExams;
