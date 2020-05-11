const mongoose = require("mongoose");

const GameSchema = mongoose.Schema({
  team: String,
  type: String,
  date: String,
});

module.exports = mongoose.model("Games", GameSchema);
