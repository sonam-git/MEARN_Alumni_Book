<<<<<<< HEAD
// import mongoose module, 
const mongoose = require("mongoose");

// establish a connection to the MongoDB database.
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/alumni-books",
    {
      // set to ensure the usage of the new URL parser and the new server discovery and monitoring engine, respectively.
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("Failed to connect to MongoDB:", err));
// export module
module.exports = mongoose.connection;
=======
const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/alumni-books", 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
>>>>>>> e2d35057c80194cd2943df681d234e71d1ed9a9b
