const eexpress = require('express');
const routes = eexpress();
const ContentController = require('../controller/ContentController');
const { contentValidator } = require('../middleware/Validation');
const {isValidAdmin} = require("../middleware/auth");

routes.post('/add', contentValidator.add, ContentController.add);
routes.get('/all', ContentController.getAll);
routes.get('/id/:id', ContentController.getById);
routes.patch('/update/:id',contentValidator.update, ContentController.update);
routes.delete('/delete/:id',ContentController.softDelete);


module.exports = routes;
