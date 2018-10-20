"use strict";

const winston = require("./../winston");
const query = require("./../query");

const wakeModule = ((winston, query) => {

    const wakeUp =  () => {
        winston.logger.info("waking up");
        return query.query("select 1 as wake", []);
    };

    return {
        wakeUp
    };
})(winston, query);

module.exports = wakeModule;