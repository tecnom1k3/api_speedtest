"use strict";

const express = require("express");
const router = express.Router();
const logModule = require("./../modules/log");

router.put("/", (req, res, next) => {

    let body = req.body;
    let request = logModule.putLog(body);

    request.then(() => {
        res.json({status: "Success"});
    }).catch((error) => {
        res.status(400).json({status: error});
    });
});

module.exports = router;