// import necessary packages
import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Home from "./pages/Home";
<<<<<<< HEAD
import Dashboard from "./components/Dashboard";
import { Profile } from "./components/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Dashboard } from '@material-ui/icons';
import  Dashboard  from './components/Dashboard';



>>>>>>> 71604bc (update signup form functionality, and remove extra export within dashboard component)

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

/*############## NOTE FOR TEAM MEMBERS ################################ : 
The purpose of the provided code ABOVE is to configure the Apollo Client to handle 
authentication with a JWT (JSON Web Token) in GraphQL requests. Please do not update this code.
Add your page or component as needed within the <Router> and <Routes>. The set up below within the function
App is one of the requirements
Thank you ##############################################################*/

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
       
          <Routes>
<<<<<<< HEAD
            <Route path="/" element={<Home />} />
          </Routes>
          <Routes>
            <Route path="/Dashboard" element={<Dashboard/>}/>
          </Routes>
          <Routes>
            <Route path="/Profile" element={<Profile/>}/>
=======
            <Route
              path='/'
              element={<Home/>}
            />
               <Route
              path='/dashboard'
              element={<Dashboard/>}
            />
>>>>>>> 71604bc (update signup form functionality, and remove extra export within dashboard component)
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
