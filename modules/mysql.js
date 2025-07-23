"use strict";

/**
 * Factory for creating a MySQL connection instance.
 * @module mysql
 */

const mysql = require("mysql");

/**
 * Provides access to the shared MySQL connection.
 * @type {{connection: import("mysql").Connection}}
 */
const mysqlModule = ((mysql) => {
    /**
     * MySQL connection configured from environment variables.
     */
    const connection = mysql.createConnection({
        host: process.env.RDS_HOST,
        user: process.env.RDS_USER,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DATABASE,
        connectTimeout: 60000
    });

    return {
        connection
    };
})(mysql);

module.exports = mysqlModule;