const express = require("express");
const routes = express();
const { reviewValidator } = require("../middleware/Validation");
const {isValidLearner} = require("../middleware/auth")
const {isValidAdmin} = require("../middleware/auth")
const ReviewController = require("../controller/ReviewController");

routes.post("/post",isValidLearner,reviewValidator.add,ReviewController.add);
routes.delete("/delete/:id",isValidLearner,ReviewController.delete);

module.exports = routes;