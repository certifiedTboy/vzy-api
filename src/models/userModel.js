const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
