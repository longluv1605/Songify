const homeRouter = require("./home.api");

const express = require("express");
const apiRouter = express.Router();

const apiRoutes = (app) => {
    app.use('', homeRouter);
}

module.exports = apiRoutes;