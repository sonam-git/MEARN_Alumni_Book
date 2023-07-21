const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/alumni-books';

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');

    // Perform data clearing operation here
    // Example: Drop the entire database
    mongoose.connection.dropDatabase().then(() => {
      console.log('Database cleared successfully.');
    }).catch((err) => {
      console.error('Error clearing database:', err);
    }).finally(() => {
      // Close the connection to the database after data clearing
      mongoose.connection.close();
    });
  })
  .catch((err) => console.error('Failed to connect to MongoDB:', err));


  // just for clearing out testing data, will delete later