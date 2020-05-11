const mongoose = require("mongoose");

const GameResultsSchema = mongoose.Schema({
  game: {
    type: mongoose.Types.ObjectId,
    ref: "Games",
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
  goals: Number,
  assists: Number,
  penalties: Number,
});

module.exports = mongoose.model("GamesResults", GameResultsSchema);
