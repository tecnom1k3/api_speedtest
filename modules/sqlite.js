"use strict";

/**
 * Factory for creating a SQLite connection instance.
 * @module sqlite
 */

const sqlite3 = require("sqlite3").verbose();
const path = require("path");

/**
 * Provides access to the shared SQLite database.
 * @type {{db: sqlite3.Database}}
 */
const sqliteModule = ((sqlite3, path) => {
    const dbPath = process.env.DB_FILE || path.join(__dirname, "..", "speedtest.db");
    const db = new sqlite3.Database(dbPath);

    return {
        db
    };
})(sqlite3, path);

module.exports = sqliteModule;
