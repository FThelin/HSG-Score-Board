const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const adminCheck = require("./admin");

router.use(express.json());

// Get
router.get("/", adminCheck, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Register user
router.post("/register", async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: password,
    });
    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.json(err);
  }
});

// Login user
router.post("/login", async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ username: req.body.loggedinusername });
  console.log(user);
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).json("Wrong username or password");
  }

  //Set session username
  req.session.username = user.username;
  if (req.session.username === "admin") {
    req.session.role = "admin";
  } else {
    req.session.role = "player";
  }

  //Send response
  res.status(200).json(user);
});

// Update user
router.put("/:id", adminCheck, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    const newPassword = await bcrypt.hash(req.body.password, 10);

    user.password = newPassword;

    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});
// Delete user
router.delete("/:id", adminCheck, async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });

    res.status(200).send("User deleted");
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
