const User = require("../models/user");
const Employee = require("../models/employee");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg });
  }

  try {
    const newUser = new User(req.body);
    const username = await User.findOne({ username: newUser.username });

    if (username) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const email = await User.findOne({ email: newUser.email });
    if (email) {
      return res.status(400).json({ error: "Email already exists" });
    }

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: `An error occurred:${error}` });
  }
};

exports.createEmployee = async (data) => {
  try {
    const newUser = new User({
      username: data.name,
      email: data.email,
      password: data.password,
    });

    await User.findOneAndDelete({ email: newUser.email });

    const email = await User.findOne({ email: newUser.email });
    if (email) {
      return res.status(400).json({ error: "Email already exists" });
    }

    await newUser.save();
    return newUser;
  } catch (error) {
    return {
      error: `An error occurred:${error}`,
    };
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(email, password);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.authenticate(password)) {
      return res
        .status(401)
        .json({ error: "Email and password does not match" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    try {
      res.cookie("token", token, {
        maxAge: 3600000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Error setting Cookies" });
    }
    const { _id, username, role } = user;
    return res.json({
      token,
      user: { _id, username, email, role },
      message: "Login success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.signOut = (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({
      success: "Logout success",
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.findUser = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET);
  const userId = decoded._id;
  try {
    const employee = await Employee.findOne({ user_id: userId });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({
      employee,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
