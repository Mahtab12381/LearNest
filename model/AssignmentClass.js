const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    attachments: {
        type: [String]
    },
    mark: {
        type: Number,
        required: [true, "Mark is required"]
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course", 
        required: [true, "Course is required"]
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Created by is required"]
    },
    isDeleted: {
        type: String,
        default: false
    },
    submissions:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Progress",
            required: false
        }
    ]
}, {
    timestamps: true
});

const Assignment = mongoose.model("Assignment", AssignmentSchema);
module.exports = Assignment;
