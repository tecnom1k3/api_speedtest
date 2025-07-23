"use strict";

const fs = require("fs");
const path = require("path");
const { createArrayCsvWriter } = require("csv-writer");
const winston = require("./../winston");

const logDao = ((fs, path, csvWriterFactory, winston) => {

    /**
     * Path to the CSV file used for storage.
     * Located under the project root in the data directory.
     */
    const csvPath = path.join(__dirname, "../../data/speedtest.csv");

    // ensure data directory exists
    fs.mkdirSync(path.dirname(csvPath), { recursive: true });

    /**
     * CSV writer instance for appending records.
     */
    const csvWriter = csvWriterFactory({
        path: csvPath,
        append: true
    });

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

        try {
            await csvWriter.writeRecords([values]);
            return 1;
        } catch (err) {
            winston.logger.error("Error writing CSV: " + err);
            throw err;
        }
    };

    return {
        create
    };
})(fs, path, createArrayCsvWriter, winston);

module.exports = logDao;

