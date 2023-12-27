const mongoose = require("mongoose");
const User = require("../Models/userModel");
const blogSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  },
  { timestamps: { type: Date, default: Date.now } }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
