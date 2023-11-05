const express = require("express");
const routes = express();
const UserController = require("../controller/UserController");
const {isValidAdmin} = require("../middleware/auth");
const {isValidLearner} = require("../middleware/auth");
const {userValidator,pagelimitValidator} = require("../middleware/Validation");



routes.get("/all",isValidAdmin,pagelimitValidator.pageLimit,UserController.getAllUser);
routes.get("/admin/:id",isValidAdmin,UserController.getUserById);
routes.patch("/update/:id",isValidAdmin,userValidator.update,UserController.updateUser);
routes.delete("/delete/:id",isValidAdmin,UserController.deleteUser);
routes.get("/my-profile",isValidLearner,UserController.getMyProfile);
routes.post("/update-profile",isValidLearner,userValidator.updateProfile,UserController.updateProfile);





module.exports = routes;