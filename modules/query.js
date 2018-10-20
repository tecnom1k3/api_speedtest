"use strict";

const mysql = require("./mysql");
const winston = require("./winston");

const queryModule = ((mysql, winston) => {

    const query = (strQuery, params) => {

        winston.logger.info("Invoked query function with " + strQuery);

        return new Promise((resolve, reject) => {
            mysql.connection.query(strQuery, params, (error, results, fields) => {
                winston.logger.info("Finished executing query");
                if (error) {
                    winston.logger.error("Error executing query ");
                    reject(error);
                }
                winston.logger.info("Ready to resolve promise");
                resolve(results);
            });
        });
    };

    return {
        query
    };

})(mysql, winston);

module.exports = queryModule;