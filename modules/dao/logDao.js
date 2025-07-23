"use strict";

const query = require("./../query");
const winston = require("./../winston");

const logDao = ((query, winston) => {

    const insertLog = "INSERT INTO speedtests (date, time, download, upload, ping, ipAddress, serverId, serverName, distance, sponsor, share) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    /**
     * Create a new speed test log entry.
     * @param model
     * @returns {Promise<number>} resolves with the inserted row id
     */
    const create = async (model) => {

        let result = await query.query(insertLog, [
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
        ]);

        winston.logger.info("got result: " + JSON.stringify(result));

        return result.insertId;

    };

    return {
        create
    };
})(query, winston);

module.exports = logDao;
