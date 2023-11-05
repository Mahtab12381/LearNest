const express = require('express');
const routes = express();
const CategoryController = require('../controller/CategoryController');
const { categoryValidator } = require('../middleware/Validation');
const {isValidAdmin} = require("../middleware/auth");


routes.post('/add', categoryValidator.add, CategoryController.add);
routes.get('/all', CategoryController.getAll);
routes.get('/id/:id', CategoryController.getById);
routes.patch('/update/:id',categoryValidator.update, CategoryController.update);
routes.delete('/delete/:id',CategoryController.softDelete);



module.exports = routes;

