"use strict";

/**
 * Database query helper functions.
 * @module query
 */

const sqlite = require("./sqlite");
const winston = require("./winston");

/**
 * Wraps access to SQLite using Promises.
 * @type {{query: function(string, Array): Promise<*>}}
 */
const queryModule = ((sqlite, winston) => {

    /**
     * Execute a SQL query using the shared connection.
     * @param {string} strQuery SQL string to execute
     * @param {Array} params Parameters for the query
     * @returns {Promise<*>} resolves with the query results
     */
    const query = (strQuery, params) => {

        winston.logger.info("Invoked query function with " + strQuery);
        const trimmed = strQuery.trim().toLowerCase();

        return new Promise((resolve, reject) => {
            if (trimmed.startsWith("select")) {
                sqlite.db.all(strQuery, params, (error, rows) => {
                    winston.logger.info("Finished executing query");
                    if (error) {
                        winston.logger.error("Error executing query ");
                        return reject(error);
                    }
                    winston.logger.info("Ready to resolve promise");
                    resolve(rows);
                });
            } else {
                sqlite.db.run(strQuery, params, function (error) {
                    winston.logger.info("Finished executing query");
                    if (error) {
                        winston.logger.error("Error executing query ");
                        return reject(error);
                    }
                    winston.logger.info("Ready to resolve promise");
                    resolve({insertId: this.lastID, changes: this.changes});
                });
            }
        });
    };

    return {
        query
    };

})(sqlite, winston);

module.exports = queryModule;
