"use strict";

const express = require("express");
const wakeModule = require("./../modules/service/wake");

const router = express.Router();
/* GET home page. */
router.get("/", function (req, res, next) {
    let result = wakeModule.wakeUp();

    result.then((result) => {
        res.json({status: result[0]}).status(200);
    }).catch((err) => {
        res.json({status: err}).status(500);
    });
});

module.exports = router;
