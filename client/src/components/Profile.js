import React from "react";
import Avatar from "@mui/material/Avatar";
import flowerImage from "../assets/images/galactic-flower.png";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/joy/Typography";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
// import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { ADD_POST } from "../utils/mutations";

export default function Profile() {
  const { loading, data, error } = useQuery(GET_ME);
  const [postText, setPostText] = useState("");
  const [addPost] = useMutation(ADD_POST);
  const [showCommentBox, setShowCommentBox] = useState(false);
const [commentText, setCommentText] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Since mutation function is async, wrap in a `try...catch` to catch any network errors from throwing due to a failed request.
    try {
      // Execute mutation and pass in defined parameter data as variables
      const { data } = await addPost({
        variables: { postText },
      });
      //postAuthor, createdAt, comments, likes
      //for updating the query of getme ask if itsw necessary to do this
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  if (loading) return "Loading...";
  // console.log("After loading check, before error check");
  if (error) return `Error! ${error.message}`;
  console.log(data);
  // //use data as props
  // let postItems;
  let friendsDisplay;
  // //  console.log('  before posts check');
  // if (data.me.posts.length) {
  //   console.log('Posts exist');
  //   const handleCommentSubmit = () => {
  //     // Perform any necessary actions with the comment text
  //     console.log("Comment submitted:", commentText);
    
  //     // Clear the comment textbox and hide it
  //     setCommentText("");
  //     setShowCommentBox(false);
  //   };
  //   postItems = data.me.posts.map((post) => (
  //     <div key={post._id}>
  //       <h3>{post.postText}</h3>
  //       <p>Author: {post.postAuthor}</p>
  //       <button className="likeButton">like</button>
  //       <button className="commentButton" onClick={() => setShowCommentBox(!showCommentBox)}>comment</button>
  //     </div>
  //   ));
  //   // postsDisplay = <h3>{data.me.posts[0]}</h3>;
  // } else {
  //   console.log("No posts");
  //   postItems = <h1>No posts at the moment</h1>;
  // }
  // //   console.log('Before friends check');
    if (data.me.friends.length) {
      console.log('Friends exist');
      friendsDisplay = data.me.friends.map((friend) => (
        <div key={friend._id}>
          <h3>{friend.fristname}</h3>
          
        </div>
      ));
    } else {
       console.log('No friends');
      friendsDisplay = <h1>No Friends at the moment</h1>;
    }
  // console.log('Before return');
  //useMutation for hook mutation
  const handleCommentSubmit = () => {
    // Perform any necessary actions with the comment text
    console.log("Comment submitted:", commentText);
  
    // Clear the comment textbox and hide it
    setCommentText("");
    setShowCommentBox(false);
  };

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

              {/* <TextField
                item
                xs={4}
                id="outlined-multiline-flexible"
                label="Name"
                multiline
                maxRows={4}
              /> */}
              <Avatar
                item
                xs={8}
                sx={{ display: "flex", alignItems: "center" }}
                alt="A beautiful flower of pink color within a glass bubble shapped casing"
                src={flowerImage}
              />
              <h1>
                  {data.me.firstname} {data.me.lastname}
                </h1>
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
            {data.me.posts.length ? (
            data.me.posts.map((post) => (
              <div key={post._id}>
                <h3>{post.postText}</h3>
                <p>Author: {post.postAuthor}</p>
                <button className="likeButton">like</button>
                <button className="commentButton" onClick={() => setShowCommentBox(!showCommentBox)}>
                  comment
                </button>
                {showCommentBox && (
                  <div>
                    <TextField
                      id="comment-textfield"
                      label="Add a comment"
                      value={commentText}
                      onChange={(event) => setCommentText(event.target.value)}
                    />
                    <Button onClick={handleCommentSubmit}>Submit Comment</Button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <h1>No posts at the moment</h1>
          )}
            {/* {postItems} */}
            <form onSubmit={handleFormSubmit}>
            
              <TextField
                item
                xs={4}
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}
                onChange={(event) => setPostText(event.target.value)}
              />
              <Button type="submit">Submit</Button>
            </form>

            {/* {addPostError && (
                <div className="my-3 bg-danger text-white p-3">
                  Tech difficulties..
                </div>
              )} */}
          </Box>
        </Grid>
        {/* education right box of layout */}
        <Grid item xs={8}>
          <Box>Friends</Box>
          {friendsDisplay}
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

