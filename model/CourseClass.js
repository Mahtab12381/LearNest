const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        subcategory: {
            type: String,
            required: false,
        },
        language:{
            type: String,
            required: [true, "Language is required"],
        },
        level:{
            type: String,
            required: [true, "Level is required"],
        },
        tag:{
            type: String,
            required: [true, "Tag is required"],
        },
        rating: {
            type: Number,
            required: false,
            default: 0
        },  
        reviews:{
            type: [
                mongoose.Schema.Types.ObjectId
            ],
            ref: "Review",
            required: false,
        },
        contents : {
            type: [
                mongoose.Schema.Types.ObjectId
            ],
            ref: "Content",
            required: false,
        },
        sections:{
            type:[String],
            required:true
        },
        created_by:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        thumbnail:{
            type: String,
            required: true,
        },
        published:{
            type: Boolean,
            required: false,
            default: false
        },
        rejected:{
            type: Boolean,
            required: false,
            default: false
        },
        isDeleted:{
            type: Boolean,
            required: false,
            default: false
        },
    },
    {
        timestamps: true,
    }

);

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
        
