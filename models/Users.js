const mongoose = require("mongoose");

module.exports = Users = mongoose.model(
  "users",
  new mongoose.Schema({
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
    date: {
      type: Date,
      default: Date.now,
    },
    apps: [
      {
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
      },
    ],
  })
);
