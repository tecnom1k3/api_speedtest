"use strict";
const AWS = require("aws-sdk");
const winston = require("./winston");

const dynamoDBModule = ((AWS, winston) => {

    const speedTestTable = process.env.SPEEDTEST_TABLE;
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    /**
     *
     * @param model
     * @returns {Promise<PromiseResult<PromiseResult<D, E>, E>>}
     */
    const putSpeedTestLog = (model) => {
        winston.logger.info("Invoked function putSpeedTestLog");
        let params = {
            TableName: speedTestTable,
            Item: model
        };

        winston.logger.info("Going to put the following params: " + JSON.stringify(params));

        let dynamoRequest = dynamoDb.put(params, (error) => {
            if (error) {
                winston.logger.error(error);
            }
        });

        winston.logger.info("Returning dynamoRequest promise");
        return dynamoRequest.promise();
    };

    return {
        putSpeedTestLog
    };
})(AWS, winston);

module.exports = dynamoDBModule;