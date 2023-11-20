const Course = require("../model/CourseClass");
const User = require("../model/UserClass");
const CartModel = require("../model/CartClass");
const Progress = require("../model/ProgressClass");
const { validationResult } = require("express-validator");

const response = require("../utility/common");
const HTTP_STATUS = require("../constants/statusCodes");
const mongoose = require("mongoose");

class CartController {
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
            const Cart = req.body;
            const learner_id = req.user._id;
            if(learner_id){
                const user = await User.findById(learner_id);
                if(!user){
                    return response(res, HTTP_STATUS.BAD_REQUEST, "User not found");
                }
            }
            if(Cart.course){
                const courses = await Course.find({_id:Cart.course});
                if(!courses){
                    return response(res, HTTP_STATUS.BAD_REQUEST, "Course not found");
                }
            }

            const extCourseProgress = await Progress.findOne({user: learner_id}).select("courseProgress");
            if(extCourseProgress){
                let matchedCourse = false;
                extCourseProgress.courseProgress.forEach(course => {
                    if(course.course == Cart.course){
                        matchedCourse = true;
                    }
                });
                if(matchedCourse){
                    return response(
                        res,
                        HTTP_STATUS.BAD_REQUEST,
                        "Course already enrolled"
                    );
                }
            }
            
            const extCart = await CartModel.findOne({learner: learner_id});

            if (extCart && extCart.courses.includes(Cart.course)) {
                return response(
                    res,
                    HTTP_STATUS.BAD_REQUEST,
                    "Course already exists in Cart"
                );
            }
            if(extCart){
                const updatedList = await CartModel.findByIdAndUpdate(extCart._id, { $push: { courses: Cart.course } }, {new: true});
                if(!updatedList){
                    return response(res, HTTP_STATUS.BAD_REQUEST, "Cart not updated");
                }
                return response(
                    res,
                    HTTP_STATUS.CREATED,
                    "Cart updated successfully",
                    updatedList
                );
            }
            const newCart = await CartModel.create({...Cart, learner: learner_id});
            const updateList = await CartModel.findByIdAndUpdate(newCart._id, { $push: { courses: Cart.course } }, {new: true});
            return response(
                res,
                HTTP_STATUS.CREATED,
                "Cart added successfully",
                updateList
            );
        } catch (e) {
            return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error",e);
        }
    }

    async removeCourse(req, res) {
        try {
            const learner_id = req.user._id;
            const course_id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(course_id)) {
                return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id");
            }
            const Cart = await CartModel.findOne({learner: learner_id});
            if(!Cart){
                return response(res, HTTP_STATUS.NOT_FOUND, "Cart not found");
            }
            const courses = Cart.courses;
            if(!courses.includes(course_id)){
                return response(res, HTTP_STATUS.NOT_FOUND, "Course not found in Cart");
            }
            const updatedCourses = courses.filter(course => course != course_id);
            const updateCart = await CartModel.findOneAndUpdate({learner: learner_id}, {courses: updatedCourses}, {new: true});
            if(!updateCart){
                return response(res, HTTP_STATUS.BAD_REQUEST, "Cart not updated");
            }

            return response(
                res,
                HTTP_STATUS.OK,
                "Course removed Successfully",
                updateCart
            );

        }
        catch (e) {
            return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
        }
    }

    async getMyCart(req, res) {
        try {
            const learner_id = req.user._id;
            const Cart = await CartModel.findOne({learner: learner_id}).populate("courses" , "name _id rating thumbnail");
            if(!Cart){
                return response(res, HTTP_STATUS.OK, "No Item in Cart");
            }

            if(Cart.courses.length === 0){
                return response(res, HTTP_STATUS.OK, "No Item in Cart");
            }
            return response(
                res,
                HTTP_STATUS.OK,
                "Cart fetched successfully",
                Cart
            );
        } catch (e) {
            return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
        }
    }

    async getAllCart(req, res) {
        try {
            const Carts = await CartModel.find().populate("courses" , "-reviews -contents -sections");
            if(!Carts){
                return response(res, HTTP_STATUS.NOT_FOUND, "No Item in Cart");
            }
            return response(
                res,
                HTTP_STATUS.OK,
                "Cart fetched successfully",
                Carts
            );
        } catch (e) {
            return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
        }
    }

    async getCartById (req, res) {
        try {
            const id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id");
            }
            const Cart = await CartModel.findById(id).populate("courses" , "-reviews -contents -sections");
            if(!Cart){
                return response(res, HTTP_STATUS.NOT_FOUND, "No Item in Cart");
            }
            return response(
                res,
                HTTP_STATUS.OK,
                "Cart fetched successfully",
                Cart
            );
        } catch (e) {
            return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
        }
    }
}



module.exports = new CartController();