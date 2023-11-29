const response = require("../utility/common.js");
const HTTP_STATUS = require("../constants/statusCodes");
const mongoose = require("mongoose");
const Progress = require("../model/ProgressClass");
const Course = require("../model/CourseClass");
const User = require("../model/UserClass");
const Transaction = require("../model/TransactionClass");
const Assignment = require("../model/AssignmentClass");
const Quiz = require("../model/QuizClass");
const Content = require("../model/ContentClass");

const { validationResult } = require("express-validator");

class ProgressController {
  async setActiveContent(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response(res, HTTP_STATUS.BAD_REQUEST, errors.array());
      }

      const { courseId, contentId } = req.body;
      console.log(courseId, contentId);

      const extCourse = await Course.findById(courseId);
      if (!extCourse) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Course does not exist");
      }

      if (extCourse) {
        const contents = extCourse.contents.includes(contentId);
        if (!contents) {
          return response(
            res,
            HTTP_STATUS.BAD_REQUEST,
            "Content does not exist"
          );
        }
      }

      const progress = await Progress.findOne({ user: req.user._id });
      if (!progress) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "Progress does not exist"
        );
      }

      let matchedCourse = false;
      progress.courseProgress.forEach((course) => {
        if (course.course == courseId) {
          matchedCourse = true;
        }
      });
      if (!matchedCourse) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "You are not enrolled");
      }

      const updatedProgress = await Progress.findOneAndUpdate(
        {
          user: req.user._id,
          "courseProgress.course": courseId,
          "courseProgress.activatedContent": { $nin: [contentId] },
        },
        {
          $push: {
            "courseProgress.$.activatedContent": contentId,
          },
          $set: {
            "courseProgress.$.lastAccessed": Date.now(),
          },
        },
        { new: true }
      );

      if (!updatedProgress) {
        const updatedProgress = await Progress.findOneAndUpdate(
          {
            user: req.user._id,
            "courseProgress.course": courseId,
          },
          {
            $set: {
              "courseProgress.$.lastAccessed": Date.now(),
            },
          },
          { new: true }
        );
        if (updatedProgress) {
          return response(
            res,
            HTTP_STATUS.BAD_REQUEST,
            "Content already active",
            updatedProgress
          );
        }
      } else {
        return response(
          res,
          HTTP_STATUS.OK,
          "Active Content set",
          updatedProgress
        );
      }
    } catch (err) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async updatedProgress(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return response(res, HTTP_STATUS.BAD_REQUEST, errors.array());
    }

    const { courseId } = req.body;

    const extCourse = await Course.findById(courseId);
    if (!extCourse) {
      return response(res, HTTP_STATUS.BAD_REQUEST, "Course does not exist");
    }

    const progress = await Progress.findOne({
      user: req.user._id,
      "courseProgress.course": courseId,
    }).select("courseProgress.$");
    if (!progress) {
      return response(res, HTTP_STATUS.BAD_REQUEST, "Progress does not exist");
    }

    let matchedCourse = false;
    progress.courseProgress.forEach((course) => {
      if (course.course == courseId) {
        matchedCourse = true;
      }
    });
    if (!matchedCourse) {
      return response(res, HTTP_STATUS.BAD_REQUEST, "You are not enrolled");
    }

    let countCompleted = 0;
    let countTotal = 0;

    if (progress) {
      countCompleted = progress.courseProgress[0].activatedContent.length;
    }

    if (extCourse) {
      countTotal = extCourse.contents.length;
    }

    const percentage = ((countCompleted + 1) / countTotal) * 100;

    const updatePercentage = await Progress.findOneAndUpdate(
      {
        user: req.user._id,
        "courseProgress.course": courseId,
      },
      {
        $set: {
          "courseProgress.$.percentageComplete": percentage,
          "courseProgress.$.lastAccessed": Date.now(),
        },
      },
      { new: true }
    );

    if (updatePercentage) {
      return response(
        res,
        HTTP_STATUS.OK,
        "Progress updated",
        updatePercentage
      );
    }

    return response(res, HTTP_STATUS.BAD_REQUEST, "Progress not updated");
  }

  async getCourseProgress(req, res) {
    try {
      const { courseId } = req.params;

      const extCourse = await Course.findById(courseId);
      if (!extCourse) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Course does not exist");
      }

      const progress = await Progress.findOne({
        user: req.user._id,
        "courseProgress.course": courseId,
      }).select("courseProgress.$");
      if (!progress) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "Progress does not exist"
        );
      }

      let matchedCourse = false;
      progress.courseProgress.forEach((course) => {
        if (course.course == courseId) {
          matchedCourse = true;
        }
      });
      if (!matchedCourse) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "You are not enrolled");
      }

      return response(
        res,
        HTTP_STATUS.OK,
        "Course Progress fetched",
        progress.courseProgress[0]
      );
    } catch (err) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async getDashboardData(req, res) {
    try {
      const course = await Course.find().countDocuments();
      const user =await User.find().countDocuments();
      const transaction = await Transaction.find().countDocuments();
      const assignment = await Assignment.find().countDocuments();
      const quiz = await Quiz.find().countDocuments();
      const content = await Content.find().countDocuments();

      return response(res, HTTP_STATUS.OK, "Dashboard data fetched", {
        course,
        user,
        transaction,
        assignment,
        quiz,
        content,
      });
    } catch (err) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async getAllMyCourseProgress(req, res) {
    try {
      const progress = await Progress.find({
        user: req.user._id,
      })
        .select("courseProgress")
        .populate("courseProgress.course", "name rating");

      if (!progress) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "Progress does not exist"
        );
      } else {
        return response(
          res,
          HTTP_STATUS.OK,
          "progress fetched successfully",
          progress[0].courseProgress
        );
      }
    } catch (err) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, err.message);
    }
  }
}

module.exports = new ProgressController();
