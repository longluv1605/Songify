const homeController = require('../controllers/home.controller');
const express = require('express');
const homeRouter = express.Router();


homeRouter.get('/home', homeController.getHomePage);

module.exports = {
    homeRouter,
};