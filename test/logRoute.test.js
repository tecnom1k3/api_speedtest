const express = require('express');
const request = require('supertest');
const proxyquire = require('proxyquire');

const winstonStub = { logger: { info: () => {}, error: () => {} } };

async function runTests() {
    const successStub = { putLog: async () => 1 };
    const logRouterSuccess = proxyquire('../routes/log', {
        './../modules/log': successStub,
        './../modules/winston': winstonStub
    });
    const appSuccess = express();
    appSuccess.use(express.json());
    appSuccess.use('/', logRouterSuccess);
    await request(appSuccess).put('/').send({}).expect(200);

    const failStub = { putLog: async () => null };
    const logRouterFail = proxyquire('../routes/log', {
        './../modules/log': failStub,
        './../modules/winston': winstonStub
    });
    const appFail = express();
    appFail.use(express.json());
    appFail.use('/', logRouterFail);
    await request(appFail).put('/').send({}).expect(409);
}

runTests().then(() => {
    console.log('Tests passed');
}).catch(err => {
    console.error('Tests failed');
    console.error(err);
    process.exit(1);
});
