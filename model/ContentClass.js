const mongoose = require("mongoose");
const ContentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    data: {
      type: String,
      required: [true, "Data is required"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    section: {
      type: String,
      required: true,
    },
    attachment: {
      type: [String],
      required: false,
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Content = mongoose.model("Content", ContentSchema);
module.exports = Content;
