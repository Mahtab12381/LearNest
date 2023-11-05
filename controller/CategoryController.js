const Category = require("../model/CategoryClass");
const response = require("../utility/common");
const { validationResult } = require("express-validator");
const HTTP_STATUS = require("../constants/statusCodes");
const mongoose = require("mongoose");

class CategoryController {
  
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
      const category = req.body;
      const extCategory = await Category.findOne({
        name: category.name,
        isDeleted: false,
      });
      if (extCategory) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "Category already exists"
        );
      }
      const newCategory = await Category.create(category);
      return response(
        res,
        HTTP_STATUS.CREATED,
        "Category added successfully",
        newCategory
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
      const categories = await Category.find({ isDeleted: false })
        .select("-__v")
        .skip((page - 1) * limit)
        .limit(limit);
      if (categories.length > 0) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Categories Data Received successfully",
          categories
        );
      }
      return response(res, HTTP_STATUS.NOT_FOUND, "No Categories Found");
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async getById(req, res) {
    try {
      const category_id = req.params.id;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response(res, HTTP_STATUS.BAD_REQUEST, errors.array());
      }
      if (!mongoose.Types.ObjectId.isValid(category_id)) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id");
      }

      const category = await Category.findById(category_id).select("-__v");
      if (category) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Category Data Received successfully",
          category
        );
      }
      return response(res, HTTP_STATUS.NOT_FOUND, "No Category Found");
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
      const category_id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(category_id)) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id");
      }
      const { name, description, subcategories } = req.body;
      let extCategory = await Category.findOne({
        name: name,
        _id: { $ne: category_id },
      });
      if (extCategory) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "Category already exists"
        );
      }
      const updatedCategory = await Category.findByIdAndUpdate(category_id, {
        $set: { name, description, subcategories },
      });
      extCategory = await Category.findById(category_id);
      if (updatedCategory) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Category updated successfully",
          extCategory
        );
      }
      return response(res, HTTP_STATUS.NOT_FOUND, "Category not found");
    } catch (e) {
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error"
      );
    }
  }

  async delete(req, res) {
    try {
      const category_id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(category_id)) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id");
      }
      const category = await Category.findByIdAndDelete({ _id: category_id });
      if (category) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Category deleted successfully",
          category
        );
      }
      return response(res, HTTP_STATUS.NOT_FOUND, "Category not found");
    } catch (e) {
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error"
      );
    }
  }

  async softDelete(req, res) {
    try {
      const category_id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(category_id)) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id");
      }
      const category = await Category.findByIdAndUpdate(category_id, {
        $set: { isDeleted: true },
      });
      if (category) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Category deleted successfully",
          category
        );
      }
      return response(res, HTTP_STATUS.NOT_FOUND, "Category not found");
    } catch (e) {
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error"
      );
    }
  }
}

module.exports = new CategoryController();
