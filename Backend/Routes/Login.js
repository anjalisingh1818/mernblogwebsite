const express = require("express");
const app = express();
const User = require("../Models/userModel");
const routes = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

routes.post("/login", async function (req, res) {
  const { email, password } = req.body;
  if (!email) {
    res.status(400).json({ error: "Email is compulsory" });
  }
  if (!password) {
    res.status(400).json({ error: "Password is compulsory" });
  }
  try {
    const user = await User.findOne({ email: email });
    console.log(user);
    if (user) {
      const result = await bcrypt.compare(password, user.password);

      if (result) {
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
          expiresIn: "2h",
        });
        res.status(200).send({
          success: true,
          message: "Login successfully",
          user: {
            name: user.name,
            email: user.email,
            _id: user._id,
          },
          token,
        });
      } else {
        res.status(400).json({ error: "INVALID CREDENTIALS" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist ! try sign up" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});
routes.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      res.status(400).json({ error: "Name is compulsory" });
    }
    if (!email) {
      res.status(400).json({ error: "Email is compulsory" });
    }
    if (!password) {
      res.status(400).json({ error: "Password is compulsory" });
    }
    const user = await User.findOne({ email });
    if (user) {
     return res.status(400).json({ error: "User exists !try Login In" });
    }
    const saltRounds = 10;
    const newpass = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      name: name,
      email: email,
      password: newpass,
    });

    res.status(201).json(newUser);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = routes;
