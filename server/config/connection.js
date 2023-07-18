// import mongoose module, 
const mongoose = require("mongoose");

// establish a connection to the MongoDB database.
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/alumni-books", {
    // set to ensure the usage of the new URL parser and the new server discovery and monitoring engine, respectively.
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => console.error('Failed to connect to MongoDB:', err));;
// export module
module.exports = mongoose.connection;