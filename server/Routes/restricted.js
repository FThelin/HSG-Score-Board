const GameResult = require("../models/Gameresult");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  if (req.method === "PUT" || req.method === "DELETE") {
    console.log("ID", req.params.id);
    const game = await GameResult.findOne({ _id: req.params.id });
    console.log("User", game.user);
    const user = await User.findOne({ _id: game.user });
    console.log("user.username:", user.username);
    console.log("req.session.username:", req.session.username);
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
