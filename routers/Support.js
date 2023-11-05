const express = require("express");
const routes = express();

const SupportController = require("../controller/SupportController");
const {isValidLearnerOrInstructor} = require("../middleware/auth");
const {supportValidator} = require("../middleware/Validation")

routes.post("/add",isValidLearnerOrInstructor,supportValidator.add,SupportController.add);
routes.get("/view/:id",isValidLearnerOrInstructor,SupportController.getSupportBYCourse);
routes.delete("/delete/:id/:message_id",isValidLearnerOrInstructor,SupportController.deleteSupportMessage);



module.exports = routes;
