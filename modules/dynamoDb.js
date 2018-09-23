"use strict";
const AWS = require("aws-sdk");

const dynamoDBModule = ((AWS) => {

    const speedTestTable = process.env.SPEEDTEST_TABLE;
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    const putSpeedTestLog = (model) => {
        let params = {
            TableName: speedTestTable,
            Item: model
        };

        let dynamoRequest = dynamoDb.put(params, (error) => {
            if (error) {
                console.log(error)
            }
        });

        return dynamoRequest.promise();
    };

    return {
        putSpeedTestLog: putSpeedTestLog
    }
})(AWS);

module.exports = dynamoDBModule;