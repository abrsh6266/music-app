const multer = require("multer");
const express = require("express");
const storage = require("../../utils/fileUpload");
const upload = multer({ storage });
const { createMusic, getMusics } = require("../../controllers/music/musicController");
const musicRouter = express.Router();

//create
musicRouter.post("/", upload.single("file"), createMusic);

// get musics
musicRouter.get("/", getMusics);

module.exports = musicRouter;
