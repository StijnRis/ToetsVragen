const fs = require("fs");
const path = require("path");
// const axios = require("axios");
const { Exam } = require("../models/exam");
const https = require("https");

async function findExams() {
    const folder = "./data";
    await Exam.removeAll();
    // await clearFolder(folder);
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
                const fileName = `${subject}-${level}-${year}-${version}.pdf`;
                const filePath = folder + "/" + fileName;

                console.log(`Downloading ${url} to ${filePath}`);

                const request = https.get(url, async function (response) {
                    if (response.statusCode === 200) {
                        const file = fs.createWriteStream(filePath);
                        response.pipe(file);
                        file.on("finish", () => {
                            file.close();
                            console.log(`Download completed at ${url}`);
                        });
                        await Exam.save(url, level, year, version, filePath);
                    } else {
                        console.log(`No exam found at ${url}`)
                    }
                });
            }
        }
    }
}

module.exports.findExams = findExams;
