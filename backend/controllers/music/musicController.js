const asyncHandler = require("express-async-handler");
const Category = require("../../model/Category/Category");
const expressAsyncHandler = require("express-async-handler");
const Music = require("../../model/Music/Music");

exports.createMusic = asyncHandler(async (req, res) => {
  const { title, genre, album, artist } = req.body;

  //check if music exists
  const musicFound = await Music.findOne({ title });
  if (musicFound) {
    throw new Error("Music already exists");
  }

  //Create music
  const post = await Music.create({
    title,
    genre,
    album,
    artist,
    file: req?.file?.path,
  });

  //? send the response
  res.json({
    status: "success",
    message: "Music Successfully created",
    post,
  });
});