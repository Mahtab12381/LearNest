const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        courses: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Course",
            required: false,
        },
        approved: {
            type: Boolean,
            required: false,
            default: false
        },

        cart:{
            type:Object,
            required:false
        },
        cancelled:{
            type:Boolean,
            required:false,
            default:false
        },
    },
    {
        timestamps: true,
    }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;


  