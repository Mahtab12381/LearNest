const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    subcategories: {
      type: [String],
      required: false,
    },
    courses: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Course",
        required: false,
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
const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
