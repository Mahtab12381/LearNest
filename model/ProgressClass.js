const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    courseProgress: [
      {
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
          required: false,
        },
        percentageComplete: {
          type: Number,
          required: false,
        },
        activatedContent: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Content",
          required: false,
        }],
        lastAccessed: {
          type: Date,
          required: false,
        },
      },
    ],
    quizProgress: [
      {
        quizId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Quiz",
          required: false,
        },
        score: {
          type: Number,
          required: false,
        },
        completed: {
          type: Boolean,
          required: false,
        },
        lastSubmittedDate: {
          type: Date,
          required: false,
        },
        attempts: {
          type: Number,
          required: false,
        },
        submittedAnswers: {
          type: [String],
          required: false,
        },
        wrongAnswers: {
          type: [Number],
          required: false,
        },
        exireAt: {
          type: Date,
          required: false,
        },
      },
    ],
    assignmentProgress: [
      {
        assignmentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Assignment",
          required: false,
        },
        submitted: {
          type: Boolean,
          required: false,
        },
        submissionDate: {
          type: Date,
        },
        attachments: {
          type: [String],
          required: false,
        },
        score: {
          type: Number,
          required: false,
        },
        feedback: {
          type: String,
          required: false,
        },
      },
    ],
    badges: [
      {
        badgeId: {
          type: String,
          required: false,
        },
        earnedDate: {
          type: Date,
          required: false,
        },
      },
    ],
    skills: [
      {
        skillId: {
          type: String,
          required: false,
        },
        proficiencyLevel: {
          type: String,
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Progress = mongoose.model("Progress", ProgressSchema);
module.exports = Progress;
