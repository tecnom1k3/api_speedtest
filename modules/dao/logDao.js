"use strict";

const query = require("./../query");
const dynamoDbModule = require("./../dynamoDb");
const winston = require("./../winston");

const logDao = ((query, dynamoDbModule, winston) => {

    const insertLog = "INSERT INTO speedtests (date, time, download, upload, ping, ipAddress, serverId, serverName, distance, sponsor, share) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    /**
     *
     * @param model
     * @returns {Promise<*|number>}
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

        await dynamoDbModule.putSpeedTestLog(model);

        return result.insertId;

    };

    return {
        create
    };
})(query, dynamoDbModule, winston);

module.exports = logDao;