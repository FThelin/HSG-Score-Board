const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const cookieSession = require("cookie-session");

router.use(express.json());

router.use(
  cookieSession({
    secret: "aVeryS3cr3tK3y",
    maxAge: 1000 * 10,
    sameSite: "strict",
    httpOnly: true,
    // secret: false,
  })
);

// Users
// get all
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json(err);
  }
});

// post user
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

  // res.redirect("/login")
});

// Login user
router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.loggedinusername });
  console.log(req.body);
  console.log("user", user);
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).json("Wrong username or password");
  }

  // //Create session
  req.session.username = user.username;
  //req.session.role = null;

  //Send response
  res.status(200).json({ user, cookie: req.session.username });
});

// Update user

// Delete user

module.exports = router;
