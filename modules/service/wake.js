"use strict";

/**
 * Helper functions for waking up the database connection.
 * @module wake
 */

const winston = require("./../winston");
const query = require("./../query");

/**
 * Collection of wake up service methods.
 * @type {{wakeUp: function(): Promise<*>}}
 */
const wakeModule = ((winston, query) => {

    /**
     * Executes a trivial query to keep the database awake.
     * @returns {Promise<*>} resolves when the query completes
     */
    const wakeUp =  () => {
        winston.logger.info("waking up");
        return query.query("select 1 as wake", []);
    };

    return {
        wakeUp
    };
})(winston, query);

module.exports = wakeModule;