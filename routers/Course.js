const express = require('express');
const routes = express();
const CourseController = require('../controller/CourseController');
const { courseValidator } = require('../middleware/Validation');
const {isValidAdmin} = require("../middleware/auth");

routes.post('/add', courseValidator.add, CourseController.add);
routes.get('/all', CourseController.getAll);
routes.get('/id/:id', CourseController.getById);
routes.patch('/update/:id',courseValidator.update, CourseController.update);
routes.delete('/delete/:id',CourseController.softDelete);
routes.get('/all/published', CourseController.getAllPublished);
routes.get('/all/published/:id', CourseController.getByidPublished);
routes.patch('/publish/:id', CourseController.publishCourse);

module.exports = routes;
