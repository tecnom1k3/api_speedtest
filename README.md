# api_speedtest
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/88854faa9f174b409e234a5a19eb97d0)](https://app.codacy.com/gh/tecnom1k3/api_speedtest/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

This project provides a small serverless API built with Express and the Serverless Framework. It logs [Speedtest](https://www.speedtest.net/) results into both MySQL and DynamoDB.

## Endpoints

- `GET /` – returns a simple JSON message
- `PUT /log` – stores a speed test result (requires an API key)
- `GET /wake` – executes a keep‑alive query

## Project Structure

- `app.js` – Express application exported as a Lambda handler
- `routes/` – route handlers for the API
- `modules/` – utilities for database access, logging and services
- `serverless.yml` – infrastructure definition for AWS

## Deployment

Install dependencies and deploy with the Serverless Framework:

```bash
npm install
npx serverless deploy --stage dev
```

Database credentials and table names are retrieved from AWS SSM parameters as defined in `serverless.yml`.

## Development Notes

This repository does not define automated tests. Running `npm test` will fail unless a test script is added.
