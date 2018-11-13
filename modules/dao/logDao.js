"use strict";

const winston = require("./../winston");
const queryBuilder = require("./../service/queryBuilder");

const logDao = ((winston, qb) => {

    const qbClient = qb.getClient();

    const speedtestTable = qbClient("speedtests");
    /**
     *
     * @param model
     * @returns {Promise<*|number>}
     */
    const create = async (model) => {

        let result = await speedtestTable.insert({
            date: model.date,
            time: model.time,
            download: model.download,
            upload: model.upload,
            ping: model.ping,
            ipAddress: model.ip_address,
            serverId: model.server_id,
            serverName: model.server_name,
            distance: model.distance,
            sponsor: model.sponsor,
            share: model.share
        });

        winston.logger.info("got result: " + JSON.stringify(result));

        return result[0];

    };

    return {
        create
    };
})(winston, queryBuilder);

module.exports = logDao;