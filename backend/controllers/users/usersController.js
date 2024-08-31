const User = require("../../model/User/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");

exports.register = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;

  // Check if user exists
  const user = await User.findOne({ username });
  if (user) {
    throw new Error("User already exists");
  }

  const newUser = new User({
    username,
    email,
    password,
  });

  // Hashing password
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);

  // Save
  await newUser.save();

  res.status(201).json({
    status: "success",
    message: "User registered successfully",
    username: username,
    email: email,
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid login credentials");
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Password doesn't match");
  }

  res.status(200).json({
    status: "success",
    message: "Logged in successfully",
    id: user._id,
    username: user.username,
    email: user.email,
    token: generateToken(user),
  });
});

exports.getProfile = asyncHandler(async (req, res) => {
  const id = req.user._id;

  const user = await User.findById(id);
  res.status(200).json({
    status: "success",
    message: "Profile fetched",
    id: user._id,
    username: user.username,
    email: user.email,
  });
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const { username, email, password } = req.body;

  // Find the user and update
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  if (username) user.username = username;
  if (email) user.email = email;
  if (password) {
    // Hash new password if provided
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }

  await user.save();

  res.status(200).json({
    status: "success",
    message: "Profile updated successfully",
    id: user._id,
    username: user.username,
    email: user.email,
  });
});

exports.deleteProfile = asyncHandler(async (req, res) => {
  const id = req.user._id;

  // Delete the user
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new Error("User not found");
  }

  res.status(200).json({
    status: "success",
    message: "Profile deleted successfully",
  });
});
