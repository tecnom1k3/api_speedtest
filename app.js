"use strict";

const serverless = require("serverless-http");
const createError = require("http-errors");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const debug = require("./modules/debug").getNamespace("api-speedtest:main");

debug("Booting");

const indexRouter = require("./routes/index");
const logRouter = require("./routes/log");
const wakeRouter = require("./routes/wake");

let app = express();

app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/log", logRouter);
app.use("/wake", wakeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    debug("Catch 404 error");
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    debug("Fell into error handler: " + err);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({status: "error"});
});

module.exports.handler = serverless(app);
