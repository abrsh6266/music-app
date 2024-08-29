const multer = require("multer");
const express = require("express");
const storage = require("../../utils/fileUpload");
const { createMusic } = require("../../controllers/music/musicController");
const musicRouter = express.Router();

//create
postRouter.post("/", upload.single("file"), createMusic);

module.exports = musicRouter;
