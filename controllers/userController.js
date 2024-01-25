import User from "../models/user.js";
import Employee from "../models/employee.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export async function signUp(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg });
  }

  try {
    const newUser = new User(req.body);
    const username = await findOne({ username: newUser.username });

    if (username) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const email = await findOne({ email: newUser.email });
    if (email) {
      return res.status(400).json({ error: "Email already exists" });
    }

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: `An error occurred:${error}` });
  }
}

export async function createEmployee(data) {
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
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
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
    return res.status(500).json({ message: "Internal server error" });
  }
}

export function signOut(req, res) {
  try {
    res.clearCookie("token");
    return res.json({
      success: "Logout success",
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function findUser(req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded._id;
    const employee = await Employee.findOne({ user_id: userId });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({
      employee,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error", e });
  }
}
