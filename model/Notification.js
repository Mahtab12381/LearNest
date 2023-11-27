const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
    message: {
        type: String,
        required: [true, "Message is required"]
    },
    read: {
        type: Boolean,
        required: false,
        default: false
    },
    type: {
        type: String,
        required: [true, "Type is required"]
    },
    link: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;
