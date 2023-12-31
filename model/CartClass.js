const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema(
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
const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;


    