"use strict";

/**
 * Factory for creating a SQLite connection instance.
 * @module sqlite
 */

const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

/**
 * Provides access to the shared SQLite database.
 * @type {{db: sqlite3.Database}}
 */
const sqliteModule = ((sqlite3, path, fs) => {
    const dbPath = process.env.DB_FILE || path.join(__dirname, "..", "speedtest.db");
    const dbExists = fs.existsSync(dbPath);
    const db = new sqlite3.Database(dbPath);

    // Initialize schema when the database file is first created
    if (!dbExists) {
        db.serialize(() => {
            db.run(
                `CREATE TABLE IF NOT EXISTS speedtests (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    date TEXT NOT NULL,
                    time TEXT NOT NULL,
                    download REAL,
                    upload REAL,
                    ping REAL,
                    ipAddress TEXT,
                    serverId INTEGER,
                    serverName TEXT,
                    distance REAL,
                    sponsor TEXT,
                    share TEXT
                )`
            );
        });
    }

    return {
        db
    };
})(sqlite3, path, fs);

module.exports = sqliteModule;
