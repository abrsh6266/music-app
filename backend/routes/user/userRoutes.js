const express = require("express");
const {
  register,
  login,
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../../controllers/users/usersController");
const userRouter = express.Router();

// Register a new user
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/profile", getProfile);
userRouter.put("/profile", updateProfile);
userRouter.delete("/profile", deleteProfile);

module.exports = userRouter;
