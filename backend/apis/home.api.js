const homeController = require("../controllers/home.controller");
const express = require("express");
const homeRouter = express.Router();

// Home
homeRouter.get("/api/home", homeController.getHomePage);

module.exports = homeRouter;
