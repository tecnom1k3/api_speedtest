"use strict";
const moment = require("moment");
const dynamoDbModule = require("./dynamoDb");

const logModule = ((moment, dynamoDbModule) => {

    const putLog = (request) => {
        let timestamp = moment(request.timestamp);
        let date = timestamp.format("YYYY-MM-DD");
        let time = timestamp.format("HH:mm:ss");

        let model = {
            server_id: request.server_id,
            sponsor: request.sponsor,
            server_name: request.server_name,
            date: date,
            time: time,
            distance: request.server_name,
            ping: request.ping,
            download: request.download,
            upload: request.upload,
            share: request.share,
            ip_address: request.ip_address
        };

        return dynamoDbModule.putSpeedTestLog(model);
    };

    return {
        putLog: putLog
    }

})(moment, dynamoDbModule);

module.exports = logModule;