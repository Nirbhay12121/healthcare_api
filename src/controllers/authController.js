// ...existing imports
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 

// existing register, login...

export const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ msg: "Email already registered" });

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "name, email, password required" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
      role: "user",
    });

    res.status(201).json({
      msg: "User registered successfully",
      user: { id: user.id, name: user.name, email: user.email, role: user.role  },
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "email, password required" });
    }

    const user = await User.findOne({ where: { email } });
    console.log("User found:", user);
    if (!user) return res.status(404).json({ msg: "User not found" });

   const test = await bcrypt.compare('123', '$2b$12$fLTIoPzZJVbMLbbOg3IMne0n7hpEIl1TcqipU8tw9Q0kLIk3H1TFK');
console.log('Manual compare:', test);


    console.log('Login input password:', password);
    console.log('Stored hash:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    // JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      msg: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Admin-only: create new admin
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ msg: "name, email, password required" });

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ msg: "Email already registered" });

    const hash = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hash,
      role: "admin",
    });

    res.status(201).json({
      msg: "Admin created successfully",
      user: { id: admin.id, name: admin.name, email: admin.email, role: admin.role }
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
