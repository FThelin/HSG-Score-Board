const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: String,
});

module.exports = mongoose.model("Users", UserSchema);
