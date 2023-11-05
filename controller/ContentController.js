const Content = require("../model/ContentClass");
const Course = require("../model/CourseClass");
const User = require("../model/UserClass");
const { validationResult } = require("express-validator");
const response = require("../utility/common");
const HTTP_STATUS = require("../constants/statusCodes");
const mongoose = require("mongoose");

class ContentController {
  
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
      const content = req.body;
      if(content.course){
        const course = await Course.findById(content.course);
        if(!course){
          return response(res, HTTP_STATUS.BAD_REQUEST, "Course not found");
        }
      }
      const newContent = await Content.create(content);


      



      await Course.findByIdAndUpdate(content.course, {
        $push: { contents: newContent._id },
      });
      return response(
        res,
        HTTP_STATUS.CREATED,
        "Content added successfully",
        newContent
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
      const contents = await Content.find({ isDeleted: false }, "-__v")
        .skip((page - 1) * limit)
        .limit(limit);
      if (contents.length > 0) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Contents Data Received successfully",
          contents
        );
      } else {
        return response(res, HTTP_STATUS.NOT_FOUND, "No Content Found");
      }
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
      const content = await Content.findById(req.params.id).select("-__v");
      if (content) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Content Data Received successfully",
          content
        );
      }
      return response(res, HTTP_STATUS.NOT_FOUND, "No Content Found");
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async update(req, res) {
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
      const content_id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(content_id)) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id");
      }
      const content = await Content.findById(content_id);
      if (!content) {
        return response(res, HTTP_STATUS.NOT_FOUND, "Content not found");
      }
      const data = req.body;
      if(data.course){
        const course = await Course.findById(data.course);
        if(!course){
          return response(res, HTTP_STATUS.BAD_REQUEST, "Course not found");
        }
      }
      const updatedContent = await Content.findByIdAndUpdate(
        content_id,
        data,
        { new: true }
      );
      return response(
        res,
        HTTP_STATUS.OK,
        "Content updated successfully",
        updatedContent
      );
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async softDelete(req, res) {
    try {
      const content_id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(content_id)) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id");
      }
      const content = await Content.findById(content_id);
      if (!content) {
        return response(res, HTTP_STATUS.NOT_FOUND, "Content not found");
      }
      if(content.isDeleted){
        return response(res, HTTP_STATUS.BAD_REQUEST, "Content already deleted");
      }
      const updatedContent = await Content.findByIdAndUpdate(
        content_id,
        { isDeleted: true },
        { new: true }
      );

        await Course.findByIdAndUpdate(content.course, {
            $pull: { contents: content_id },
        });

      return response(
        res,
        HTTP_STATUS.OK,
        "Content deleted successfully",
        updatedContent
      );
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

}

module.exports = new ContentController();
