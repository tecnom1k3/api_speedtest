"use strict";

const mysql = require('mysql');

const mysqlModule = (function (sql) {
    const connection = sql.createConnection({
        host: process.env.RDS_HOST,
        user: process.env.RDS_USER,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DATABASE,
        connectTimeout: 60000
    });

    return {
        connection: connection
    }
})(mysql);

module.exports = mysqlModule;