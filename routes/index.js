"use strict";

const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
    res.json({title: "Express"});
});

module.exports = router;
