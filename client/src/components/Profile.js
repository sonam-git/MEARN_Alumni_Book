import React from "react";
import Avatar from "@mui/material/Avatar";
import flowerImage from "../assets/images/galactic-flower.png";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/joy/Typography";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import {useMutation} from "@apollo/client";
import { GET_ME } from '../utils/queries';

//Displaying user avatar //variable for uploaded file of user
export function Profile() {
  return (
    <Sheet>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Container>
            {/* upper layer with profile pic */}
            <Box
              sx={{
                width: 300,
                height: 300,
                backgroundColor: "primary.dark",
                "&:hover": {
                  backgroundColor: "primary.main",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              {/* adding input field for name field */}
              <TextField
                item
                xs={4}
                id="outlined-multiline-flexible"
                label="Name"
                multiline
                maxRows={4}
              />
              <Avatar
                item
                xs={8}
                sx={{ display: "flex", alignItems: "center" }}
                alt="A beautiful flower of pink color within a glass bubble shapped casing"
                src={flowerImage}
              />
            </Box>
          </Container>
        </Grid>

        {/* first layer */}
        <Grid item xs={4}>
          <Box
            sx={{
              width: 300,
              height: 300,
              backgroundColor: "primary.dark",
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <Typography sx={{ flex: 1 }}>Create Post</Typography>

            <TextField
              item
              xs={4}
              id="outlined-multiline-flexible"
              multiline
              maxRows={4}
            />
          </Box>
        </Grid>
        {/* education right box of layout */}
        <Grid item xs={8}>
          <Box>Friends</Box>
          <TextField
            id="outlined-basic"
            label="Friend List"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Sheet>
  );
}

//******Function that will be used when the profile page is loaded*******//
//**making the useQuery to the backend for GET_ME * *//
const RetrievingUserInfo = () =>{
  
  //make query call 
  const { loading, data,error } = useQuery(GET_ME);
  if (loading) return "Loading...";

  if (error) return `Error! ${error.message}`;

  return <Layout grid>{JSON.stringify(data)}</Layout>;

  //need to destructure and then place onto UI layout page 

}


//**Function that will be used when taking account of the useState of UI**//
//**Making a mutation to the backend for a comment adding to the mutation ADD_POST  posts**//
//will be used for the input field of the textbox
const CreatingAPost = () =>{
  //inital state is no posts makes call getMe for posts to check if there are any posts for user
  const [name, setName] = useState('');
   const [addPost, { error }] = useMutation(ADD_POST);  
   const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Since mutation function is async, wrap in a `try...catch` to catch any network errors from throwing due to a failed request.
    try {
      // Execute mutation and pass in defined parameter data as variables
      const { data } = await addPost({
        variables: { postText, postAuthor, createdAt, comments, likes },
      });
//for updating the query of getme ask if itsw necessary to do this 
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    //for the text box for the post 
    <div>
      <h3>Add yourself to the list...</h3>
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12 col-lg-9">
          <input
            placeholder="Add your profile name..."
            value={name}
            className="form-input w-100"
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className="col-12 col-lg-3">
          <button className="btn btn-info btn-block py-3" type="submit">
            Add Profile
          </button>
        </div>
        {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
      </form>
    </div>
  );
}




//create component for query to obtain firstname  from user in sesh
//component using react any type of hook in this case useQuery

//const functionname = (params)=>{
  //use query hook assiged to variable 
  //console.log  variable to see the hook useQuery
  //data we can do anything with it 
  //err is for validation


// use state for the editing of the text fields 

//name initial state from signup information in session 
//connects to the user profiles on dashboard when is updated

//posts initial state no text 
//updates when user edits and saves it 


export default Profile;
