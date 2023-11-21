const express = require("express");
const routes = express();
const {isValidLearner} = require("../middleware/auth")
const ProgressController = require("../controller/ProgressController");

routes.patch("/set-active-content",isValidLearner,ProgressController.setActiveContent);


module.exports = routes;
