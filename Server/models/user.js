const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "instructor"], // Restricts the value to only these two options
      default: "student",
    },
    bio: { type: String,
         default: ""
         },
    profileImage: { type: String,
         default: ""
         },
  },
  { timestamps: true },
); // Automatically adds createdAt and updatedAt dates

module.exports = mongoose.model("User", userSchema);
