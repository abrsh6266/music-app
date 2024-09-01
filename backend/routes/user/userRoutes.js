const express = require("express");
const {
  register,
  login,
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../../controllers/users/usersController");
const isLoggedIn = require("../../middlewares/isLogged");
const userRouter = express.Router();

// Register a new user
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/profile", isLoggedIn, getProfile);
userRouter.put("/profile", isLoggedIn, updateProfile);
userRouter.delete("/profile", isLoggedIn, deleteProfile);

module.exports = userRouter;
