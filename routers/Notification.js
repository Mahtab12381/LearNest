const express = require('express');
const routes = express();
const NotificationController = require('../controller/NotificationController');
const { notificationValidator } = require('../middleware/Validation');

routes.post('/add', notificationValidator.add, NotificationController.add);
routes.get('/user-notification/:id', NotificationController.getByuserID);
routes.patch('/make-read/:id', NotificationController.makeRead);

module.exports = routes;
