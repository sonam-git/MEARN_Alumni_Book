const cloudinary = require('cloudinary').v2;

// Initialize Cloudinary with your API credentials
cloudinary.config({
    cloud_name: 'dnuanxqxg',
    api_key: '768784817278892',
    api_secret: 'u9P50V-GFNRIGKXjX4GzcQdYSB4',
  });

  module.exports = cloudinary;