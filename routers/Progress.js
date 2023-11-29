const express = require("express");
const routes = express();
const {isValidLearner} = require("../middleware/auth")
const {isValidAdminOrLearnerOrInstructor} = require("../middleware/auth")
const ProgressController = require("../controller/ProgressController");

routes.patch("/set-active-content",isValidLearner,ProgressController.setActiveContent);
routes.patch("/update-course-progress",isValidLearner,ProgressController.updatedProgress);
routes.get("/get-progress/:courseId",isValidLearner,ProgressController.getCourseProgress);
routes.get("/get-all-my-course-progress",isValidLearner,ProgressController.getAllMyCourseProgress)
routes.get("/dashboard",isValidAdminOrLearnerOrInstructor,ProgressController.getDashboardData)


module.exports = routes;
