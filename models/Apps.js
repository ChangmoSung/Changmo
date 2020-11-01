const mongoose = require("mongoose");

module.exports = Apps = mongoose.model(
  "apps",
  new mongoose.Schema({
    appName: {
      type: String,
      required: true,
      unique: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      unique: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  })
);
