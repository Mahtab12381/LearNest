const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    questions: [
      {
        questionText: {
          type: String,
          required: [true, "Question is required"],
        },
        options: {
          type: [String],
          required: [true, "Options are required"],
        },
        correctAnswer: {
          type: Number,
          required: [true, "Correct answer is required"],
        },
      },
    ],
    timeLimit: {
      type: Number,
      required: [true, "Time limit is required"],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course is required"],
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    isDeleted: {
      type: String,
      default: false,
    },
    submissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Progress",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model("Quiz", QuizSchema);
module.exports = Quiz;
