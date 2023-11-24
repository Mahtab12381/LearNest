const express = require("express");
const routers = express();
const {isValidLearnerOrInstructor} = require("../middleware/auth");
const {isValidInstructor}= require("../middleware/auth");
const {isValidLearner}= require("../middleware/auth");
const AssignmentController = require("../controller/AssignmentController");
const {assignmentValidator} = require("../middleware/Validation");

routers.post("/add",isValidInstructor,assignmentValidator.add,AssignmentController.add);
routers.get("/id/:id",isValidLearnerOrInstructor,AssignmentController.getAssignment);
routers.patch("/update/:id",isValidInstructor,assignmentValidator.update,AssignmentController.updateAssignment);
routers.patch("/delete/:id",isValidInstructor,AssignmentController.deleteAssignment);
routers.post("/submit/:id",isValidLearner,AssignmentController.submitAssignment);
routers.post("/scorepost/:id/:assignment",isValidInstructor,assignmentValidator.score,AssignmentController.submitScore);
routers.get("/bycourse/:id",isValidLearnerOrInstructor,AssignmentController.getAssignmentByCourse);
routers.get("/mycreatedassignment",isValidLearnerOrInstructor,AssignmentController.getmyCreatedAssignment);
routers.get("/mysubmittedassignment",isValidLearnerOrInstructor,AssignmentController.getmySubmittedAssignment);




module.exports = routers;