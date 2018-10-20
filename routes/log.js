"use strict";

const express = require("express");
const router = express.Router();
const logModule = require("./../modules/log");
const winston = require("./../modules/winston");

router.put("/", async (req, res, next) => {

    winston.logger.info("Invoked route with request: " + JSON.stringify(req.body));

    let body = req.body;
    let insertId = await logModule.putLog(body);
    let status = "fail";
    let httpCode = 409;
    winston.logger.info("promise resolved with insert id " + insertId);
    if (insertId !== undefined) {
        status = "success";
        httpCode = 200;
    }
    res.json({status: status}).status(httpCode);
});

module.exports = router;