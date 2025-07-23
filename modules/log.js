"use strict";
const moment = require("moment");
const winston = require("./winston");
const logDao = require("./dao/logDao");

/**
 * Speed test logging helper.
 * @type {{putLog: function(object): Promise<*>}}
 */
const logModule = ((moment, winston, logDao) => {

    /**
     * Persist a speed test log entry.
     * @param request
     * @returns {Promise<*>} resolves with the inserted id
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
            insertId = 0;
        });

        return insertId;
    };

    return {
        putLog
    };

})(moment, winston, logDao);

module.exports = logModule;
