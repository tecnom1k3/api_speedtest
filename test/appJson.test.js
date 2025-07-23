/**
 * Basic test verifying that JSON payloads are parsed when using only
 * Express's built-in middleware.
 */
const express = require("express");
const request = require("supertest");
const proxyquire = require("proxyquire");

const stubRouter = express.Router();
stubRouter.put("/", (req, res) => {
    res.status(200).json({ parsed: req.body });
});

const app = proxyquire("../app", {
    "./routes/log": stubRouter
});

async function runTest() {
    await request(app)
        .put("/log")
        .send({ msg: "hello" })
        .expect(200, { parsed: { msg: "hello" } });
}

runTest().then(() => {
    console.log("JSON parsing test passed");
}).catch(err => {
    console.error("JSON parsing test failed");
    console.error(err);
    process.exit(1);
});
