const Review = require("../model/ReviewClass");
const Course = require("../model/CourseClass");
const response = require("../utility/common");
const { validationResult } = require("express-validator");
const HTTP_STATUS = require("../constants/statusCodes");
const mongoose = require("mongoose");

class ReviewController {
  async add(req, res) {
    try {
      let newrating = null;
      let newreview = null;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "Validation Error",
          errors.array()
        );
      }
      const review = req.body;
      if (review.rating) {
        newrating = review.rating;
      }
      if (review.review) {
        newreview = review.review;
      }
      review.user = req.user;
      const extCourse = await Course.findOne({ _id: review.course,isDeleted:false,published:true});
      // const extpurchaseCourse = await Tran.findOne({
      //   user: review.user,
      //   courses: { $elemMatch: { course: review.course } },
      // });
      const extReview = await Review.findOne({
        user: review.user,
        course: review.course,
      });
      if (!extCourse) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Course does not exist");
      }
      // if (!extpurchaseCourse) {
      //   return response(
      //     res,
      //     HTTP_STATUS.BAD_REQUEST,
      //     "You have not purchased this course"
      //   );
     // }
      if (extReview) {
        if (
          extReview.rating == review.rating &&
          extReview.review == review.review
        ) {
          return response(
            res,
            HTTP_STATUS.BAD_REQUEST,
            "You can not review same course twice"
          );
        }
        if (newrating == null && newreview == null) {
          return response(
            res,
            HTTP_STATUS.BAD_REQUEST,
            "Please provide rating or review"
          );
        }
        const updatedReview = await Review.updateOne(
          { user: review.user, course: review.course },
          { $set: { rating: newrating, review: newreview } }
        );
        if (newrating != null) {
          const totalreviews = await Review.countDocuments({
            course: review.course,
            rating: { $ne: null },
          });
          const currentrating = extCourse.rating;
          if (extReview.rating == null) {
            const newRating =
              (currentrating * (totalreviews - 1) + review.rating) /
              totalreviews;
            await Course.updateOne(
              { _id: review.course },
              { $set: { rating: newRating } }
            );
          } else {
            const newRating =
              (currentrating * totalreviews +
                review.rating -
                extReview.rating) /
              totalreviews;
            await Course.updateOne(
              { _id: review.course },
              { $set: { rating: newRating } }
            );
          }
        }
        if (newrating == null && extReview.rating != null) {
          const totalreviews = await Review.countDocuments({
            course: review.course,
            rating: { $ne: null },
          });
          const currentrating = extCourse.rating;
          const newRating =
            (currentrating * (totalreviews + 1) - extReview.rating) /
            totalreviews;
          if (isNaN(newRating)) {
            await Course.updateOne({ _id: review.course }, { $set: { rating: 0 } });
          } else {
            await Course.updateOne(
              { _id: review.course },
              { $set: { rating: newRating } }
            );
          }
        }
        if (updatedReview) {
          const updated = await Review.findById({ _id: extReview._id }).select("-user -__v");
          return response(
            res,
            HTTP_STATUS.OK,
            "Review updated successfully",
            updated
          );
        }
        return response(res, HTTP_STATUS.BAD_REQUEST, "Review not updated");
      }

      if (newrating == null && newreview == null) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "Please provide rating or review"
        );
      }
      const reviewitem = {
        user: review.user,
        course: review.course,
        rating: newrating,
        review: newreview,
      };
      const newReview = new Review(reviewitem);
      let savedReview = await newReview.save();
      const updatedCourse = await Course.updateOne(
        { _id: review.course },
        { $push: { reviews: savedReview._id } }
      );
      if (newrating != null) {
        const totalreviews = await Review.countDocuments({
          course: review.course,
          rating: { $ne: null },
        });
        const currentrating = extCourse.rating;
        const newRating =
          (currentrating * (totalreviews - 1) + review.rating) / totalreviews;
        await Course.updateOne(
          { _id: review.course },
          { $set: { rating: newRating } }
        );
      }
      savedReview = savedReview.toObject();
      delete savedReview.user;
      delete savedReview.__v;
      if (savedReview && updatedCourse) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Review added successfully",
          savedReview
        );
      }
      return response(
        res,
        HTTP_STATUS.BAD_REQUEST,
        "Review Not Added",
        savedReview
      );
    } catch (err) {
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error"
      );
    }
  }

  async delete (req, res) {
    try{
      const review_id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(review_id)) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id");
      }
      const review = await Review.findById({ _id: review_id });
      if (!review) {
        return response(res, HTTP_STATUS.NOT_FOUND, "Review not found");
      }
      if (review.user != req.user._id) {
        console.log(review.user);
        console.log(req.user);
        return response(
          res,
          HTTP_STATUS.UNAUTHORIZED,
          "You are not authorized to delete this review"
        );
      }
        const deletereview = await Review.findByIdAndDelete({ _id: review_id });
        const updatedCourse = await Course.findByIdAndUpdate(
          { _id: deletereview.course },
          { $pull: { reviews: review_id } }
        );
        if (deletereview.rating != null) {
          const totalreviews = await Review.countDocuments({
            course: deletereview.course,
            rating: { $ne: null },
          });
          const currentrating = updatedCourse.rating;
          const newRating =
            (currentrating * (totalreviews + 1) - deletereview.rating) /
            totalreviews;
          if (isNaN(newRating)) {
            await Course.updateOne(
              { _id: deletereview.course },
              { $set: { rating: 0 } }
            );
          } else {
            await Course.updateOne(
              { _id: deletereview.course },
              { $set: { rating: newRating } }
            );
          }
        }
        if (deletereview && updatedCourse) {
          return response(res, HTTP_STATUS.OK, "Review deleted successfully");
        }
      }
    catch(err){
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error"
      );
    }
  }
}
module.exports = new ReviewController();
