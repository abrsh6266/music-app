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

  let query = {};
  if (search) {
    const searchRegex = new RegExp(search, "i");
    query = {
      $or: [
        { title: searchRegex },
        { artist: searchRegex },
        { album: searchRegex },
        { genre: searchRegex },
      ],
    };
  }

  const musics = await Music.find(query).skip(skip).limit(limit);
  const total = await Music.countDocuments(query);

  res.json({
    status: "success",
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalMusic: total,
    musics,
  });
});

// update music
exports.updateMusic = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, genre, album, artist } = req.body;

  const updatedMusic = await Music.findByIdAndUpdate(
    id,
    {
      title,
      genre,
      album: album || "Unknown",
      artist,
    },
    { new: true }
  );

  if (!updatedMusic) {
    res.status(404);
    throw new Error("Music not found");
  }

  res.json({
    status: "success",
    message: "Music successfully updated",
    updatedMusic,
  });
});

// delete music
exports.deleteMusic = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedMusic = await Music.findByIdAndDelete(id);

  if (!deletedMusic) {
    res.status(404);
    throw new Error("Music not found");
  }

  res.json({
    status: "success",
    message: "Music successfully deleted",
    deletedMusic,
  });
});
