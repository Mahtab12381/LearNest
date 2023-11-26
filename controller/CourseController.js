const Course = require("../model/CourseClass");
const User = require("../model/UserClass");
const Category = require("../model/CategoryClass");
const { validationResult } = require("express-validator");
const response = require("../utility/common");
const HTTP_STATUS = require("../constants/statusCodes");
const mongoose = require("mongoose");
const Progress = require("../model/ProgressClass");
const ejs = require("ejs");
const path = require("path");
const sendEmail = require("../utility/sendEmail");


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
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Error",
        e
      );
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
        .populate("created_by", "name imageUrl email")
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

      const filters = {
        isDeleted: false,
        published: true,
      };

      if (req.query.name) {
        filters.name = { $regex: new RegExp(req.query.name, "i") };
      }

      if(req.query.category){
        const category= await Category.findOne({name:req.query.category}).select("_id");
        filters.category = category;
      }

      if (req.query.subcategory) {
        filters.subcategory = req.query.subcategory;
      }

      if (req.query.rating) {
        filters.rating = { $gte: parseFloat(req.query.rating) , $lte: parseFloat(req.query.rating) + 1 };
      }

      if (req.query.level) {
        filters.level = req.query.level;
      }

      if (req.query.language) {
        filters.language = req.query.language;
      }

      const sortOptions = {};
      if (req.query.sortBy) {
        sortOptions[req.query.sortBy] =
          req.query.sortByType === "desc" ? -1 : 1;
      }

      const courses = await Course.find(
        filters
      )
        .populate("created_by", "name imageUrl email")
        .select("-__v")
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(limit);

      const count = await Course.countDocuments(filters);

      if (courses.length > 0) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Courses Data Received successfully",
          {
          total: count,
          page,
          limit,
          onThisPage: courses.length,
          courses:courses,
          }
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
        .populate({
          path: "reviews",
          select: "-__v",
          populate: {
            path: "user",
            select: "name imageUrl email",
          },
        })
        .populate("category", "name")
        .populate("created_by", "name imageUrl email")
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
        .populate({
          path: "reviews",
          select: "-__v",
          populate: {
            path: "user",
            select: "name imageUrl email",
          },
        })
        .populate("category", "name")
        .populate("created_by", "name imageUrl email")
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
        { published: true, rejected: false, tag: "New" },
        { new: true }
      ).populate("created_by", "name email");
      if (course) {
        const renderedHtml = await ejs.renderFile(
          path.join(__dirname, "../views/coursePublished.ejs"),
          { name:course.created_by.name, link: process.env.VITE_REACT_BASE+"course/" + course._id}
        );
        sendEmail(course.created_by.email, "Course Publication", renderedHtml);
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

  async rejectCourse(req, res) {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id");
      }
      const course = await Course.findByIdAndUpdate(
        id,
        { rejected: true, published: false, tag: "Rejected" },
        { new: true }
      ).populate("created_by", "name email");
      if (course) {
        const renderedHtml = await ejs.renderFile(
          path.join(__dirname, "../views/coursePublished.ejs"),
          { name:course.created_by.name, link: process.env.VITE_REACT_BASE+"course/" + course._id}
        );
        sendEmail(course.created_by.email, "Course Publication", renderedHtml);
        return response(
          res,
          HTTP_STATUS.OK,
          "Course rejected successfully",
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
      const courses = await Progress.find({
        user: userId,
      })
        .select("courseProgress")
        .populate({
          path: "courseProgress.course",
          select: "name rating thumbnail",
          match: { published: true },
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

  async getMyCreatedCourses(req, res) {
    try {
      const userId = req.user._id;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response(res, HTTP_STATUS.BAD_REQUEST, errors.array());
      }
      const courses = await Course.find({
        created_by: userId,
      })
        .populate("created_by", "name imageUrl email")
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
}

const courseController = new CourseController();
module.exports = courseController;
