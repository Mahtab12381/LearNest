const express = require("express");
const routes = express();
const TransactionController = require("../controller/TransactionController");
const { transactionValidator } = require("../middleware/Validation");
const { isValidAdmin } = require("../middleware/auth");
const { isValidLearner } = require("../middleware/auth");

routes.post("/add", isValidLearner, TransactionController.add);
routes.patch("/cancel/:id", isValidLearner, TransactionController.cancel);
routes.get("/view", isValidLearner, TransactionController.getMyTransaction);

routes.get("/all", isValidAdmin, TransactionController.getAll);
routes.get("/id/:id", isValidAdmin, TransactionController.getById);
routes.patch("/approve/:id", isValidAdmin, TransactionController.approve);
routes.get("/all/pending", TransactionController.getAllPending);

module.exports = routes;
