const homeController = require("../controllers/homeController");
const express = require("express");
const router = express.Router();

// Home
router.get("/home", homeController.getHomePage);

module.exports = router;
