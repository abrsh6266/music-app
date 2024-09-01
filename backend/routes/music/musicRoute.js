const multer = require("multer");
const express = require("express");
const storage = require("../../utils/fileUpload");
const upload = multer({ storage });
const {
  createMusic,
  getMusics,
  deleteMusic,
  updateMusic,
} = require("../../controllers/music/musicController");
const isLoggedIn = require("../../middlewares/isLogged");
const musicRouter = express.Router();

// create
musicRouter.post("/", isLoggedIn, upload.single("file"), createMusic);

//* get musics
musicRouter.get("/", getMusics);

//? Update a music
musicRouter.put("/:id", upload.single("file"), updateMusic);

//! Delete a music
musicRouter.delete("/:id", isLoggedIn, deleteMusic);

module.exports = musicRouter;
