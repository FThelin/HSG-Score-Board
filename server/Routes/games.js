const express = require("express");
const Game = require("../models/Game");
const GameResult = require("../models/Gameresult");
const router = express.Router();
const restricted = require("./restricted");

router.use(express.json());

//Find all results
router.get("/results", async (req, res) => {
  try {
    const games = await GameResult.find().populate("game").populate("user");
    res.status(200).json(games);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Post new result
router.post("/:game/:user", restricted, async (req, res) => {
  try {
    const gameResult = new GameResult({
      game: req.params.game,
      user: req.params.user,
      goals: req.body.goals,
      assists: req.body.assists,
      penalties: req.body.penalties,
    });

    const newResult = await gameResult.save();
    res.status(200).json(newResult);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Update result
router.put("/:id", restricted, async (req, res) => {
  try {
    const game = await GameResult.findOne({ _id: req.params.id });

    game.goals = req.body.goals;
    game.assists = req.body.assists;
    game.penalties = req.body.penalties;

    await game.save();

    res.json(game);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Delete result
router.delete("/:id", restricted, async (req, res) => {
  try {
    await GameResult.deleteOne({ _id: req.params.id });
    res.status(200).send("Results deleted");
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
