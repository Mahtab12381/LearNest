const Course = require("../model/CourseClass");
const User = require("../model/UserClass");
const Support = require("../model/SupportClass");
const Progress = require("../model/ProgressClass");
const response = require("../utility/common.js");
const HTTP_STATUS = require("../constants/statusCodes");
const mongoose = require("mongoose");

const { validationResult } = require("express-validator");

class SupportClass {
  async add(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response(res, HTTP_STATUS.BAD_REQUEST, errors.array());
      }
      const { course, message } = req.body;
      const user = await User.findById(req.user._id);
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

      const extCourseProgress = await Progress.findOne({
        user: req.user._id,
      }).select("courseProgress");
      if (extCourseProgress) {
        let matchedCourse = false;
        extCourseProgress.courseProgress.forEach((course) => {
          if (course.course == req.body.course) {
            matchedCourse = true;
          }
        });
        if (!matchedCourse) {
          return response(res, HTTP_STATUS.BAD_REQUEST, "you are not enrolled");
        }
      }

      const extsupport = await Support.findOne({ course: course });
      if (!extsupport) {
        const support = {
          course: course,
          discussion: [
            {
              user_id: req.user._id,
              message: message,
            },
          ],
        };
        const newSupport = await Support.create(support);
        return response(
          res,
          HTTP_STATUS.CREATED,
          "Support message added successfully",
          newSupport
        );
      } else {
        const support = {
          user_id: req.user._id,
          message: message,
        };
        const newSupport = await Support.findOneAndUpdate(
          { course: course },
          { $push: { discussion: support } },
          { new: true }
        );
        return response(
          res,
          HTTP_STATUS.CREATED,
          "Support message added successfully",
          newSupport
        );
      }
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async getSupportBYCourse(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response(res, HTTP_STATUS.BAD_REQUEST, errors.array());
      }
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
          return response(res, HTTP_STATUS.BAD_REQUEST, "You are not enrolled");
        }
      }

      const extsupport = await Support.findOne({ course: course });
      if (!extsupport) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "No support found");
      }
      return response(
        res,
        HTTP_STATUS.OK,
        "Support Data Received successfully",
        extsupport
      );
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async deleteSupportMessage(req, res) {
    try {
        const course = req.params.id;
        const message_id = req.params.message_id;
        if(!mongoose.Types.ObjectId.isValid(message_id)){
            return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id");
        }
        if(!mongoose.Types.ObjectId.isValid(course)){
            return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id");
        }
        const extCourse = await Course.findById(course);
        if (!extCourse) {
          return response(res, HTTP_STATUS.BAD_REQUEST, "Course does not exist");
        }
        const extsupport = await Support.findOne({ course: course });
        if (!extsupport) {
          return response(res, HTTP_STATUS.BAD_REQUEST, "No support found");
        }
        const extMessage = extsupport.discussion.find(message => message._id == message_id && message.user_id == req.user._id);
        if(!extMessage){
            return response(res, HTTP_STATUS.BAD_REQUEST, "You can not delete this message");
        }
        const newDiscussion = extsupport.discussion.filter(message => message._id != message_id);
        const newSupport = await Support.findByIdAndUpdate(extsupport._id, {discussion: newDiscussion}, {new: true});
        return response(
            res,
            HTTP_STATUS.OK,
            "Message deleted successfully",
            newSupport
        );
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }
}

module.exports = new SupportClass();
