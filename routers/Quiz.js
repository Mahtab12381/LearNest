const express = require('express');
const routers = express();
const QuizController = require('../controller/QuizController');
const { quizValidator } = require('../middleware/Validation');
const {isValidInstructor}= require("../middleware/auth");
const {isValidLearnerOrInstructor}= require("../middleware/auth");
const {isValidLearner}= require("../middleware/auth");

routers.post('/add',isValidInstructor, quizValidator.add, QuizController.add);
routers.patch('/update/:id', isValidInstructor,quizValidator.update, QuizController.update);
routers.delete('/delete/:id', isValidInstructor,QuizController.softDelete);
routers.get('/bycourse/:id', isValidLearnerOrInstructor,QuizController.getByCourse);
routers.get('/id/:id', isValidLearnerOrInstructor,QuizController.getbyID);
routers.post('/submit/:id', isValidLearner,quizValidator.submit,QuizController.submitQuiz);
routers.post('/start/:id', isValidLearner,QuizController.startQuiz);
routers.get('/mycreatedquiz', isValidInstructor,QuizController.getMyCreatedQuiz);
routers.get('/mysubmittedquiz', isValidLearner,QuizController.getMySubmittedQuiz);
module.exports = routers;