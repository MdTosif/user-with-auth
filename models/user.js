const mongoose = require("./db");

const userScheme = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: String,
  email: String,
});

exports.userModel = mongoose.model("user", userScheme);
