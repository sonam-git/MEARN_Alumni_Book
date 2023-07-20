// import required packages
const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
//import apollo server
const { ApolloServer } = require('apollo-server-express');
const { graphqlUploadExpress } = require('graphql-upload'); // Import the graphqlUploadExpress middleware

// import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');


//db connection
const db = require('./config/connection');

// initialize app
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// create a new instance of ApolloServer,
const server = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
  context: authMiddleware,
  // persistedQueries: false, // Disable persisted queries
  // cacheControl: {
  //   defaultMaxAge: 3600, // Set the default cache expiration time in seconds (e.g., 1 hour)
  //   calculateHttpHeaders: false, // Disable automatic HTTP cache headers
  // },
});

app.use(graphqlUploadExpress())
// body parser middlewares (require for Graphql to work)
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 


// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// GET route for the root URL.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// initializes the ApolloServer and performs any necessary setup operations.
const startServer = async () => {
  await server.start();
  // to forward any GQL request in our express server
  server.applyMiddleware({ app });
  // method to listen for the 'open' event, 
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};
// start the server and begin listening for incoming requests. 
startServer();