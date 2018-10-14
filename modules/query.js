"use strict";

const mysql = require("./mysql");

const queryModule = ((mysql) => {

    const query = async (strQuery) => {

        return new Promise((resolve, reject) => {
            mysql.connection.query(strQuery, (error, results, fields) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    };

    return {
        query: query
    }

})(mysql);

module.exports = queryModule;