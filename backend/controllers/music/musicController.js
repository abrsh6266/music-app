const asyncHandler = require("express-async-handler");
const Music = require("../../model/Music/Music");

//create musics
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
    album: album ? album : "Unknown",
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

// get all musics
exports.getMusics = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const musics = await Music.find().skip(skip).limit(limit);
  const total = await Music.countDocuments();

  res.json({
    status: "success",
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
    musics,
  });
});
