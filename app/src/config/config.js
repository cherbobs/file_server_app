// src/config/config.js
module.exports = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://mongo:27017/file_server',
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
    MAX_UPLOAD_SIZE: 2 * 1024 * 1024 * 1024, // 2 Go
    LINK_EXPIRATION: 60 * 60 // 1 heure
  };
  