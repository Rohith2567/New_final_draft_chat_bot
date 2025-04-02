const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  purchase: { type: Number, default: 0 } // New purchase field, default to 0
});

module.exports = mongoose.model("User", userSchema);
