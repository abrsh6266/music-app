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
const musicRouter = express.Router();

// create
musicRouter.post("/", upload.single("file"), createMusic);

//* get musics
musicRouter.get("/", getMusics);

//? Update existing music entry
musicRouter.put("/:id", upload.single("file"), updateMusic);

//! Delete a music entry
musicRouter.delete("/:id", deleteMusic);

module.exports = musicRouter;
