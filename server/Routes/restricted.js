const GameResult = require("../models/Gameresult");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  if (req.method === "PUT" || req.method === "DELETE") {
    const game = await GameResult.findOne({ _id: req.params.id });
    const user = await User.findOne({ _id: game.user });

    console.log("USer name", user.username);
    console.log("session username", req.session.username);
    if (user.username === req.session.username) {
      next();
    } else {
      res.status(401).send("Not authorized man");
    }
  } else if (req.method === "POST") {
    if (req.session) {
      next();
    } else {
      res.status(401).send("Not authorized");
    }
  }
};
