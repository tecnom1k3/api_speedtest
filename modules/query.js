"use strict";

/**
 * Database query helper functions.
 * @module query
 */

const mysql = require("./mysql");
const winston = require("./winston");

/**
 * Wraps access to MySQL using Promises.
 * @type {{query: function(string, Array): Promise<*>}}
 */
const queryModule = ((mysql, winston) => {

    /**
     * Execute a SQL query using the shared connection.
     * @param {string} strQuery SQL string to execute
     * @param {Array} params Parameters for the query
     * @returns {Promise<*>} resolves with the query results
     */
    const query = (strQuery, params) => {

        winston.logger.info("Invoked query function with " + strQuery);

        return new Promise((resolve, reject) => {
            mysql.connection.query(strQuery, params, (error, results) => {
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