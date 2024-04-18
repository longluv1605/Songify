const homeRouter = require('./home.api');
const express = require('express');

const router = express.Router();

const api = (app) => {
    app.use('/api', homeRouter.homeRouter);
}

module.exports = api;