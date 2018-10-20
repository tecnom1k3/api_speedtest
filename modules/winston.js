"use strict";

const winston = require("winston");

const winstonModule = ((winston) => {

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