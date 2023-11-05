const express = require("express");
const routes = express();
const { cartValidator } = require("../middleware/Validation");
const {isValidLearner} = require("../middleware/auth")
const {isValidAdmin} = require("../middleware/auth")
const CartController = require("../controller/CartController");

routes.post("/add",isValidLearner,cartValidator.add,CartController.add);
routes.patch("/remove/:id",isValidLearner,cartValidator.add,CartController.removeCourse);
routes.get("/view",isValidLearner,CartController.getMyCart);
routes.get("/view/all",isValidAdmin,CartController.getAllCart);
routes.get("/view/:id",isValidAdmin,CartController.getCartById);


module.exports = routes;