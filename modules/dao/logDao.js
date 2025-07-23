"use strict";

const fs = require("fs");
const path = require("path");
const winston = require("./../winston");

const logDao = ((fs, path, winston) => {

    /**
     * Path to the CSV file used for storage.
     * Located under the project root in the data directory.
     */
    const csvPath = path.join(__dirname, "../../data/speedtest.csv");

    /**
     * Appends a speed test record to a CSV file.
     *
     * @param model
     * @returns {Promise<number>} resolves with 1 on success
     */
    const create = async (model) => {

        const values = [
            model.date,
            model.time,
            model.download,
            model.upload,
            model.ping,
            model.ip_address,
            model.server_id,
            model.server_name,
            model.distance,
            model.sponsor,
            model.share
        ];

        const line = values.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",") + "\n";

        return new Promise((resolve, reject) => {
            fs.appendFile(csvPath, line, (err) => {
                if (err) {
                    winston.logger.error("Error writing CSV: " + err);
                    reject(err);
                } else {
                    resolve(1);
                }
            });
        });
    };

    return {
        create
    };
})(fs, path, winston);

module.exports = logDao;

