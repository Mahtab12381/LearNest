const response = require("../utility/common.js");
const HTTP_STATUS = require("../constants/statusCodes");
const mongoose = require("mongoose");
const Progress = require("../model/ProgressClass");
const Course = require("../model/CourseClass");

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
            "Content already active"
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

  
}

module.exports = new ProgressController();
