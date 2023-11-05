const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema(
    {
        learner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        courses: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Course",
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Wishlist = mongoose.model("Wishlist", WishlistSchema);
module.exports = Wishlist;
