const GameResult = require("../models/Gameresult");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const game = await await GameResult.findOne({ _id: req.params.id });
  const user = await User.findOne({ _id: game.user });

  if (req.method === "PUT" || req.method === "DELETE") {
    if (user.username === req.session.username) {
      next();
    } else {
      res.status(401).send("Not authorized");
    }
  } else if (req.method === "POST") {
    if (req.session) {
      next();
    } else {
      res.status(401).send("Not authorized");
    }
  }
};
