const mongoose = require("mongoose");

module.exports = Apps = mongoose.model(
  "apps",
  new mongoose.Schema({
    appName: {
      type: String,
      required: true,
      unique: true,
    },
    appUrl: {
      type: String,
      required: true,
      unique: true,
    },
    fileName: {
      type: String,
      required: true,
      unique: true,
    },
    fileUrl: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  })
);
