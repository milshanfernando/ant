require("dotenv").config();
module.exports = {
  port: process.env.PORT || 8080,
  mongoUrl: process.env.MONGO_URL,
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
};
