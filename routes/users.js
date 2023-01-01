const router = require("express").Router();
const User = require("../models/users.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/users/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please add all fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({
      message: "Registration Successful",
      token: generateToken(newUser._id, newUser.name, newUser.email),
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        res.status(200).json({
          status: "Success",
          message: "Login Successful",
          token: generateToken(user._id, user.name, user.email),
        });
      } else {
        res.status(401).json({ message: "Invalid Email or Password" });
      }
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

const generateToken = (id, name, email) => {
  return jwt.sign({ id, name, email }, process.env.JWT_SECRET);
};

module.exports = router;
