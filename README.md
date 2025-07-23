# api_speedtest
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/88854faa9f174b409e234a5a19eb97d0)](https://app.codacy.com/gh/tecnom1k3/api_speedtest/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

This project provides a small Express API. It logs [Speedtest](https://www.speedtest.net/) results into a local SQLite database.

## Endpoints

- `GET /` – returns a simple JSON message
- `PUT /log` – stores a speed test result
- `GET /wake` – executes a keep‑alive query

## Project Structure

- `app.js` – Express application entry point
- `routes/` – route handlers for the API
- `modules/` – utilities for database access, logging and services

## Deployment

Install dependencies and start the server:

```bash
npm install
node app.js
```

The SQLite database file defaults to `speedtest.db` in the project root and can be overridden with the `DB_FILE` environment variable.

## Development Notes

This repository does not define automated tests. Running `npm test` will fail unless a test script is added.
