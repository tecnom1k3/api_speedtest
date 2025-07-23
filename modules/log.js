"use strict";
const moment = require("moment");
const winston = require("./winston");
const logDao = require("./dao/logDao");

/**
 *
 * @type {{putLog}}
 */
const logModule = ((moment, winston, logDao) => {

    /**
     * Stores a speed test result.
     *
     * @param request {object} speed test payload
     * @returns {Promise<number>} insert id or 0 when an error occurs
     */
    const putLog = (request) => {
        winston.logger.info("Invoked function putLog");
        let timestamp = moment(request.timestamp);
        let date = timestamp.format("YYYY-MM-DD");
        let time = timestamp.format("HH:mm:ss");

        let model = {
            server_id: request.server_id,
            sponsor: request.sponsor,
            server_name: request.server_name,
            date: date,
            time: time,
            distance: request.distance,
            ping: request.ping,
            download: request.download,
            upload: request.upload,
            share: request.share,
            ip_address: request.ip_address
        };

        winston.logger.info("Created model " + JSON.stringify(model));

        let insertId = logDao.create(model).catch((err) => {
            winston.logger.error("error on execution: " + err);
            return 0;
        });

        return insertId;
    };

    return {
        putLog
    };

})(moment, winston, logDao);

module.exports = logModule;
