const mongoose = require("mongoose");

const SupportSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course is required"],
    },
    discussion: {
      type: [
        {
          user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          message: {
            type: String,
          },
        },
        {
          timestamps: true,
        }
      ],
        required: false,
    },
  }
);

const Support = mongoose.model("Support", SupportSchema);
module.exports = Support;
