const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: [true, "Course is required"]
    },
    rating: {
        type: Number,
        optional: true
    },
    review: {
        type: String,
        optional: true
    }
}, {
    timestamps: true
});

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;