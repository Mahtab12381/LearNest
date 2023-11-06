const Course = require("../model/CourseClass");
const User = require("../model/UserClass");
const Category = require("../model/CategoryClass");
const { validationResult } = require("express-validator");
const response = require("../utility/common");
const HTTP_STATUS = require("../constants/statusCodes");
const mongoose = require("mongoose");
const Progress = require("../model/ProgressClass");

class CourseController {
  async add(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "Validation Error",
          errors.array()
        );
      }
      const course = req.body;

      if (course.category) {
        const category = await Category.findById(course.category);
        if (!category) {
          return response(res, HTTP_STATUS.BAD_REQUEST, "Category not found");
        }
      }

      const newCourse = await Course.create({
        ...course,
        created_by: req.user._id,
      });
      return response(
        res,
        HTTP_STATUS.CREATED,
        "Course added successfully",
        newCourse
      );
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async getAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response(res, HTTP_STATUS.BAD_REQUEST, errors.array());
      }
      const courses = await Course.find({ isDeleted: false })
        .select("-__v")
        .skip((page - 1) * limit)
        .limit(limit);
      if (courses.length > 0) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Courses Data Received successfully",
          courses
        );
      }
      return response(res, HTTP_STATUS.NOT_FOUND, "No Courses Found");
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async getAllPublished(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response(res, HTTP_STATUS.BAD_REQUEST, errors.array());
      }
      const courses = await Course.find({ isDeleted: false, published: true })
        .select("-__v")
        .skip((page - 1) * limit)
        .limit(limit);
      if (courses.length > 0) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Courses Data Received successfully",
          courses
        );
      }
      return response(res, HTTP_STATUS.NOT_FOUND, "No Courses Found");
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async getByidPublished(req, res) {
    try {
      const id = req.params.id;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response(res, HTTP_STATUS.BAD_REQUEST, errors.array());
      }
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id");
      }
      const course = await Course.findById(id)
        .populate("contents", "-__v")
        .select("-__v");
      if (course && course.published) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Course Data Received successfully",
          course
        );
      }
      return response(res, HTTP_STATUS.NOT_FOUND, "No Course Found");
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async getById(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response(res, HTTP_STATUS.BAD_REQUEST, errors.array());
      }
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id");
      }

      const course = await Course.findById(id)
        .populate("contents", "-__v")
        .select("-__v");
      if (course) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Course Data Received successfully",
          course
        );
      }
      return response(res, HTTP_STATUS.NOT_FOUND, "No Course Found");
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async update(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response(res, HTTP_STATUS.BAD_REQUEST, errors.array());
      }
      const id = req.params.id;
      const course = req.body;

      if (course.created_by) {
        const user = await User.findById(course.created_by);
        if (!user) {
          return response(res, HTTP_STATUS.BAD_REQUEST, "User not found");
        }
      }

      if (course.category) {
        const category = await Category.findById(course.category);
        if (!category) {
          return response(res, HTTP_STATUS.BAD_REQUEST, "Category not found");
        }
      }
      const updatedCourse = await Course.findByIdAndUpdate(id, course, {
        new: true,
      });
      if (updatedCourse) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Course updated successfully",
          updatedCourse
        );
      }
      return response(res, HTTP_STATUS.NOT_FOUND, "No Course Found");
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const deletedCourse = await Course.findByIdAndDelete(id);
      if (deletedCourse) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Course deleted successfully",
          deletedCourse
        );
      }
      return response(res, HTTP_STATUS.NOT_FOUND, "No Course Found");
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async softDelete(req, res) {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id");
      }
      const deletedCourse = await Course.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
      );
      if (deletedCourse) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Course deleted successfully",
          deletedCourse
        );
      }
      return response(res, HTTP_STATUS.NOT_FOUND, "No Course Found");
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async publishCourse(req, res) {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id");
      }
      const course = await Course.findByIdAndUpdate(
        id,
        { published: true },
        { new: true }
      );
      if (course) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Course published successfully",
          course
        );
      }
      return response(res, HTTP_STATUS.NOT_FOUND, "No Course Found");
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async getMyEnrolledCourses(req, res) {
    try {
      const userId = req.user._id;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response(res, HTTP_STATUS.BAD_REQUEST, errors.array());
      }
      const courses =  await Progress.find({
        user: userId,
      })
        .select("courseProgress")
        .populate({
          path: "courseProgress.course",
          select: "-__v",
          match: { isDeleted: false, published: true },
        })
        .skip((page - 1) * limit)
        .limit(limit);
      if (courses.length > 0) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Courses Data Received successfully",
          courses
        );
      }
      return response(res, HTTP_STATUS.NOT_FOUND, "No Courses Found");
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }
}

const courseController = new CourseController();
module.exports = courseController;
