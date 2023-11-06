const express = require("express");
const routes = express();
const { wishlistValidator } = require("../middleware/Validation");
const {isValidLearner} = require("../middleware/auth")
const {isValidAdmin} = require("../middleware/auth")

const WishListController = require("../controller/WishListController");

routes.post("/add",isValidLearner,wishlistValidator.add,WishListController.add);
routes.delete("/remove/:id",isValidLearner,wishlistValidator.add,WishListController.removeCourse);
routes.get("/view",isValidLearner,WishListController.getMyWishList);
routes.get("/view/all",isValidAdmin,WishListController.getAllWishList);
routes.get("/view/:id",isValidAdmin,WishListController.getWishListById);


module.exports = routes;
