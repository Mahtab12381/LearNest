const Quiz = require("../model/QuizClass");
const Course = require("../model/CourseClass");
const Progress = require("../model/ProgressClass");
const response = require("../utility/common.js");
const HTTP_STATUS = require("../constants/statusCodes");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

class QuizClass {
  async add(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response(res, HTTP_STATUS.BAD_REQUEST, errors.array());
      }
      const { name, description, questions, timeLimit, course } = req.body;

      const extCourse = await Course.findById(course);
      if (!extCourse) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Course does not exist");
      }

      if (req.role == "instructor") {
        const extCourseinstructor = await Course.findOne({
          _id: course,
          created_by: req.user._id,
        });
        if (!extCourseinstructor) {
          return response(
            res,
            HTTP_STATUS.BAD_REQUEST,
            "You are not the instructor of this course"
          );
        }
      }
      const quiz = new Quiz({
        name: name,
        description: description,
        questions: questions,
        timeLimit: timeLimit,
        course: course,
        created_by: req.user._id,
      });
      await quiz.save();
      return response(res, HTTP_STATUS.OK, "Quiz added successfully", quiz);
    } catch (err) {
      console.log(err);
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, err);
    }
  }

  async update(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response(res, HTTP_STATUS.BAD_REQUEST, errors.array());
      }

      const quiz = await Quiz.findById(req.params.id);

      if (!quiz) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Quiz does not exist");
      }
      if (quiz.isDeleted == true) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Quiz is deleted");
      }

      if (quiz.created_by != req.user._id) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "You are not the creator of this quiz"
        );
      }

      const { name, description, questions, timeLimit, course } = req.body;

      const extCourse = await Course.findById(course);
      if (!extCourse) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Course does not exist");
      }
      if (req.role == "instructor") {
        const extCourseinstructor = await Course.findOne({
          _id: course,
          created_by: req.user._id,
        });
        if (!extCourseinstructor) {
          return response(
            res,
            HTTP_STATUS.BAD_REQUEST,
            "You are not the instructor of this course"
          );
        }
      }
      quiz.name = name;
      quiz.description = description;
      quiz.questions = questions;
      quiz.timeLimit = timeLimit;
      quiz.course = course;
      await quiz.save();
      return response(res, HTTP_STATUS.OK, "Quiz updated successfully", quiz);
    } catch (err) {
      console.log(err);
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal error",
        err
      );
    }
  }

  async softDelete(req, res) {
    try {
      if (mongoose.mongo.ObjectId.isValid(req.params.id) == false) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id");
      }
      const quiz = await Quiz.findById(req.params.id);

      if (!quiz) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Quiz does not exist");
      }
      if (quiz.isDeleted == true) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Quiz is deleted");
      }

      if (quiz.created_by != req.user._id) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "You are not the creator of this quiz"
        );
      }
      quiz.isDeleted = true;
      await quiz.save();
      return response(res, HTTP_STATUS.OK, "Quiz deleted successfully", quiz);
    } catch (err) {
      console.log(err);
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, err);
    }
  }

  async getbyID(req, res) {
    try {
      const quiz = await Quiz.findById(req.params.id);

      if (!quiz) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Quiz does not exist");
      }
      if (quiz.isDeleted == true) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Quiz is deleted");
      }

      if (req.role == "instructor") {
        if (quiz.created_by != req.user._id) {
          return response(
            res,
            HTTP_STATUS.BAD_REQUEST,
            "You are not the creator of this quiz"
          );
        }
      }

      if (req.role == "learner") {
        const extCourseProgress = await Progress.findOne({
          user: req.user._id,
        }).select("courseProgress");
        if (extCourseProgress) {
          let matchedCourse = false;
          extCourseProgress.courseProgress.forEach((course) => {
            if (course.course.toString() == quiz.course.toString()) {
              matchedCourse = true;
            }
          });
          if (!matchedCourse) {
            return response(
              res,
              HTTP_STATUS.BAD_REQUEST,
              "You are not enrolled"
            );
          }
        }
      }

      return response(res, HTTP_STATUS.OK, "Quiz retrived succesfully", quiz);
    } catch (err) {
      console.log(err);
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, err);
    }
  }

  async getByCourse(req, res) {
    try {
      const course = req.params.id;
      const extCourse = await Course.findById(course);
      if (!extCourse) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Course does not exist");
      }

      if (req.role == "instructor") {
        const extCourseinstructor = await Course.findOne({
          _id: course,
          created_by: req.user._id,
        });
        if (!extCourseinstructor) {
          return response(
            res,
            HTTP_STATUS.BAD_REQUEST,
            "You are not the instructor of this course"
          );
        }
      }

      if (req.role == "learner") {
        const extCourseProgress = await Progress.findOne({
          user: req.user._id,
        }).select("courseProgress");
        if (extCourseProgress) {
          let matchedCourse = false;
          extCourseProgress.courseProgress.forEach((course) => {
            if (course.course == req.params.id) {
              matchedCourse = true;
            }
          });
          if (!matchedCourse) {
            return response(
              res,
              HTTP_STATUS.BAD_REQUEST,
              "You are not enrolled"
            );
          }
        }
      }

      const quiz = await Quiz.find({ course: course, isDeleted: false });

      if (quiz.length == 0) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "There is no quiz");
      }
      return response(res, HTTP_STATUS.OK, "Quiz retrived succesfully", quiz);
    } catch (err) {
      console.log(err);
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, err);
    }
  }

  async submitQuiz(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response(res, HTTP_STATUS.BAD_REQUEST, errors.array());
      }

      const quiz = await Quiz.findById(req.params.id);

      if (!quiz) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Quiz does not exist");
      }
      if (quiz.isDeleted == true) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Quiz is deleted");
      }

      if (req.role == "learner") {
        const extCourseProgress = await Progress.findOne({
          user: req.user._id,
        }).select("courseProgress");
        if (extCourseProgress) {
          let matchedCourse = false;
          extCourseProgress.courseProgress.forEach((course) => {
            if (course.course.toString() == quiz.course.toString()) {
              matchedCourse = true;
            }
          });
          if (!matchedCourse) {
            return response(
              res,
              HTTP_STATUS.BAD_REQUEST,
              "You are not enrolled"
            );
          }
        }
      }

      const expiryTime = await Progress.findOne({
        user: req.user._id,
        "quizProgress.quizId": req.params.id,
      }).select("quizProgress.quizId quizProgress.exireAt quizProgress.completed");

      const extQuizbyLearner = expiryTime.quizProgress.filter((quiz) => {
        return quiz.quizId.toString() == req.params.id.toString();
      });

      if (extQuizbyLearner[0].exireAt < Date.now()) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "Quiz time expired , Try again"
        );
      }

      if (extQuizbyLearner[0].completed == true) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Quiz already completed");
      }
      const correctAnswers = quiz.questions.map((question) => {
        return question.correctAnswer;
      });

      const submittedAnswers = req.body.answers;

      if (correctAnswers.length != submittedAnswers.length) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          `${correctAnswers.length-submittedAnswers.length} answers left`
        );
      }

      let wrongAnswers = [];
      let score = 0;
      let completed = false;

      submittedAnswers.forEach((answer, index) => {
        if (answer == correctAnswers[index]) {
          score++;
        } else {
          wrongAnswers.push(index + 1);
        }
      });

      if (score > correctAnswers.length * 0.3) {
        completed = true;
      }

      const submitQUiz = await Progress.findOneAndUpdate(
        {
          user: req.user._id,
          "quizProgress.quizId": req.params.id,
        },
        {
          $set: {
            "quizProgress.$.completed": completed,
            "quizProgress.$.lastSubmittedDate": Date.now(),
            "quizProgress.$.score": score,
            "quizProgress.$.submittedAnswers": submittedAnswers,
            "quizProgress.$.wrongAnswers": wrongAnswers,
          },
        },
        {
          new: true,
        }
      );
      const updateQuiz = await Quiz.findByIdAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $push: { submissions: submitQUiz._id },
        },
        { new: true }
      );
      if (submitQUiz && updateQuiz) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Quiz submitted successfully",
          submitQUiz.quizProgress.pop()
        );
      }
    } catch (err) {
      console.log(err);
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Eorror",
        err
      );
    }
  }

  async startQuiz(req, res) {
    try {
      const quiz = await Quiz.findById(req.params.id);

      if (!quiz) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Quiz does not exist");
      }
      if (quiz.isDeleted == true) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Quiz is deleted");
      }

      if (req.role == "learner") {
        const extCourseProgress = await Progress.findOne({
          user: req.user._id,
        }).select("courseProgress");
        if (extCourseProgress) {
          let matchedCourse = false;
          extCourseProgress.courseProgress.forEach((course) => {
            if (course.course.toString() == quiz.course.toString()) {
              matchedCourse = true;
            }
          });
          if (!matchedCourse) {
            return response(
              res,
              HTTP_STATUS.BAD_REQUEST,
              "You are not enrolled"
            );
          }
        }
      }
      const extQuizzes = await Progress.findOne({
        user: req.user._id,
      }).select("quizProgress");

      if (extQuizzes) {
        let matchedQuiz = false;
        let completedQuiuz = false;
        let attempts = 0;
        extQuizzes.quizProgress.forEach((quiz) => {
          if (
            quiz.quizId.toString() == req.params.id.toString() &&
            quiz.completed == true
          ) {
            completedQuiuz = true;
          }
          if (
            quiz.quizId.toString() == req.params.id.toString() &&
            quiz.completed == false
          ) {
            matchedQuiz = true;
            attempts = quiz.attempts; 
          }
        });
        if (completedQuiuz) {
          return response(
            res,
            HTTP_STATUS.BAD_REQUEST,
            "Quiz already completed"
          );
        }
        if (matchedQuiz) {
          const updateExtQuizzes = await Progress.findOneAndUpdate(
            {
              user: req.user._id,
              "quizProgress.quizId": req.params.id,
            },
            {
              $set: {
                "quizProgress.$.attempts":attempts+ 1,
                "quizProgress.$.exireAt": Date.now() + quiz.timeLimit * 60000,
              },
            },
            {
              new: true,
            }
          );
          if (updateExtQuizzes) {
            return response(
              res,
              HTTP_STATUS.OK,
              "Quiz started",
              updateExtQuizzes
            );
          }
        } else {
          const updateExtQuizzes = await Progress.findOneAndUpdate(
            {
              user: req.user._id,
            },
            {
              $push: {
                quizProgress: {
                  quizId: req.params.id,
                  completed: false,
                  completionDate: null,
                  attempts: 1,
                  submittedAnswers: [],
                  wrongAnswers: [],
                  exireAt: Date.now() + quiz.timeLimit * 60000,
                },
              },
            },
            {
              new: true,
            }
          );
          if (updateExtQuizzes) {
            return response(
              res,
              HTTP_STATUS.OK,
              "Quiz started",
              updateExtQuizzes
            );
          }
        }
      }
    } catch (err) {
      console.log(err);
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Error",
        err
      );
    }
  }
}

module.exports = new QuizClass();
