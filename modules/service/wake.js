"use strict";

/**
 * Helper functions for waking up the database connection.
 * @module wake
 */

const winston = require("./../winston");

/**
 * Collection of wake up service methods.
 * @type {{wakeUp: function(): Promise<*>}}
 */
const wakeModule = ((winston) => {

    /**
     * Resolves immediately to indicate the service is running.
     * @returns {Promise<*>} resolves when complete
     */
    const wakeUp = () => {
        winston.logger.info("waking up");
        return Promise.resolve(["awake"]);
    };

    return {
        wakeUp
    };
})(winston);

module.exports = wakeModule;
