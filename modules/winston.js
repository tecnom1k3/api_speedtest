"use strict";

/**
 * Winston logger configuration wrapper.
 * @module winston
 */

const winston = require("winston");

/**
 * Provides a preconfigured Winston logger instance.
 * @type {{logger: import("winston").Logger}}
 */
const winstonModule = ((winston) => {

    /**
     * Application logger set to the "info" level.
     */
    const logger = winston.createLogger({
        level: "info",
        format: winston.format.cli(),
        transports: [
            new winston.transports.Console()
        ],
        exitOnError: false
    });
    
    return {
        logger
    };

})(winston);

module.exports = winstonModule;