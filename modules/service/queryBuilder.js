"use strict";

const knex = require("knex");
const winston = require("./../winston");

const queryBuilder = ((k, w) => {

    const client = k({
        client: "mysql",
        connection: {
            host : process.env.RDS_HOST,
            user : process.env.RDS_USER,
            password : process.env.RDS_PASSWORD,
            database : process.env.RDS_DATABASE
        },
        debug: true,
        asyncStackTraces: true,
        log: {
            warn(message) {
                w.logger.warn(message);
            },
            error(message) {
                w.logger.error(message);
            },
            deprecate(message) {
                w.logger.info(message);
            },
            debug(message) {
                w.logger.debug(message);
            },
        }
    });

    const getClient = () => {
        return client;
    };

    return {
        getClient
    }

})(knex, winston);

module.exports = queryBuilder;