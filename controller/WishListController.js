const Course = require("../model/CourseClass");
const User = require("../model/UserClass");
const Wishlist = require("../model/Wishlist");
const { validationResult } = require("express-validator");

const response = require("../utility/common");
const HTTP_STATUS = require("../constants/statusCodes");
const mongoose = require("mongoose");

class WishlistController {
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
            const wishlist = req.body;
            const learner_id = req.user._id;
            if(learner_id){
                const user = await User.findById(learner_id);
                if(!user){
                    return response(res, HTTP_STATUS.BAD_REQUEST, "User not found");
                }
            }
            if(wishlist.course){
                const courses = await Course.find({_id:wishlist.course});
                if(!courses){
                    return response(res, HTTP_STATUS.BAD_REQUEST, "Course not found");
                }
            }

            const extWishlist = await Wishlist.findOne({learner: learner_id});

            if (extWishlist && extWishlist.courses.includes(wishlist.course)) {
                return response(
                    res,
                    HTTP_STATUS.BAD_REQUEST,
                    "Course already exists in wishlist"
                );
            }
            if(extWishlist){
                const updatedList = await Wishlist.findByIdAndUpdate(extWishlist._id, { $push: { courses: wishlist.course } }, {new: true});
                if(!updatedList){
                    return response(res, HTTP_STATUS.BAD_REQUEST, "Wishlist not updated");
                }
                return response(
                    res,
                    HTTP_STATUS.CREATED,
                    "Wishlist updated successfully",
                    updatedList
                );
            }
            const newWishlist = await Wishlist.create({...wishlist, learner: learner_id});
            const updateList = await Wishlist.findByIdAndUpdate(newWishlist._id, { $push: { courses: wishlist.course } }, {new: true});
            return response(
                res,
                HTTP_STATUS.CREATED,
                "Wishlist added successfully",
                updateList
            );
        } catch (e) {
            return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
        }
    }

    async removeCourse(req, res) {
        try {
            const learner_id = req.user._id;
            const course_id = req.params.id;
            console.log(course_id);

            if (!mongoose.Types.ObjectId.isValid(course_id)) {
                return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id");
            }
            const wishlist = await Wishlist.findOne({learner: learner_id});
            if(!wishlist){
                return response(res, HTTP_STATUS.NOT_FOUND, "Wishlist not found");
            }
            const courses = wishlist.courses;
            if(!courses.includes(course_id)){
                return response(res, HTTP_STATUS.NOT_FOUND, "Course not found in WishList");
            }

            const updatedCourses = courses.filter(course => course != course_id);
            console.log(updatedCourses);
            const updateWishList = await Wishlist.findOneAndUpdate({learner: learner_id}, {courses: updatedCourses}, {new: true});
            if(!updateWishList){
                return response(res, HTTP_STATUS.BAD_REQUEST, "Wishlist not updated");
            }

            return response(
                res,
                HTTP_STATUS.OK,
                "Course removed Successfully",
                updateWishList
            );

        }
        catch (e) {
            return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
        }
    }

    async getMyWishList(req, res) {
        try {
            const learner_id = req.user._id;
            const wishlist = await Wishlist.findOne({learner: learner_id}).populate("courses" , "-reviews -contents -sections");
            if(!wishlist){
                return response(res, HTTP_STATUS.NOT_FOUND, "No Item in Wishlist");
            }

            if(wishlist.courses.length === 0){
                return response(res, HTTP_STATUS.NOT_FOUND, "No Item in Wishlist");
            }
            return response(
                res,
                HTTP_STATUS.OK,
                "Wishlist fetched successfully",
                wishlist
            );
        } catch (e) {
            return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
        }
    }

    async getAllWishList(req, res) {
        try {
            const wishlists = await Wishlist.find().populate("courses" , "-reviews -contents -sections");
            if(!wishlists){
                return response(res, HTTP_STATUS.NOT_FOUND, "No Item in Wishlist");
            }
            return response(
                res,
                HTTP_STATUS.OK,
                "Wishlist fetched successfully",
                wishlists
            );
        } catch (e) {
            return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
        }
    }

    async getWishListById (req, res) {
        try {
            const id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id");
            }
            const wishlist = await Wishlist.findById(id).populate("courses" , "-reviews -contents -sections");
            if(!wishlist){
                return response(res, HTTP_STATUS.NOT_FOUND, "No Item in Wishlist");
            }
            return response(
                res,
                HTTP_STATUS.OK,
                "Wishlist fetched successfully",
                wishlist
            );
        } catch (e) {
            return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
        }
    }
}
module.exports = new WishlistController();