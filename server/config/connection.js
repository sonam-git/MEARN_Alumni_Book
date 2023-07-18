<<<<<<< HEAD
// import mongoose module,
=======
// import mongoose module, 
>>>>>>> 2577892e991a28eacb5ae745421cdf0ea014d1d2
const mongoose = require("mongoose");

// establish a connection to the MongoDB database.
mongoose
<<<<<<< HEAD
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
>>>>>>> 2577892e991a28eacb5ae745421cdf0ea014d1d2
