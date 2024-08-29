const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Instance of Cloudinary Storage for Audio Files
const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["mp3", "wav", "ogg"],
  params: {
    folder: "music app",
  },
});

module.exports = storage;
