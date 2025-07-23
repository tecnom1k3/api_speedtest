"use strict";

const express = require("express");
const router = express.Router();
const logModule = require("./../modules/log");
const winston = require("./../modules/winston");

router.put("/", async (req, res) => {

    winston.logger.info("Invoked route with request: " + JSON.stringify(req.body));

    let body = req.body;
    let insertId = await logModule.putLog(body);
    let result = "fail";
    let httpCode = 409;
    winston.logger.info("promise resolved with insert id " + insertId);
    if (insertId) {
        result = "success";
        httpCode = 200;
    }
    res.status(httpCode).json({ status: result });
});

module.exports = router;
