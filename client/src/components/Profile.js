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
import { REMOVE_POST } from "../utils/mutations";

export default function Profile() {
  const { loading, data, error } = useQuery(GET_ME);
  const [postText, setPostText] = useState("");
  const [addPost] = useMutation(ADD_POST);
  const [removePost] = useMutation(REMOVE_POST);
  // const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentBoxStates, setCommentBoxStates] = useState({});


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

  // console.log('Before return');
  //useMutation for hook mutation
  // const handleCommentSubmit = () => {
  //   // Perform any necessary actions with the comment text
  //   console.log("Comment submitted:", commentText);

  //   // Clear the comment textbox and hide it
  //   setCommentText("");
  //   setShowCommentBox(false);
  // };
  const toggleCommentBox = (postId) => {
    setCommentBoxStates((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };
  const handleCommentSubmit = (postId) => {
    // Perform any necessary actions with the comment text for the specific post
    console.log(`Comment submitted for post ${postId}:`, commentText);

    // Clear the comment textbox for the specific post
    setCommentText("");
  };
//handle form for deleting post
  const handleDeletePost = async (postId) => {
    try {
      // Execute the removePost mutation and pass the postId as a variable
      await removePost({
        variables: { postId },
      });
  
      // Perform any necessary actions after successful deletion, such as updating the UI
      console.log("Post deleted successfully");
      window.location.reload(); 
    } catch (error) {
      // Handle any errors that occur during the deletion process
      console.error("Error deleting post:", error);
    }
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
            <Typography sx={{ flex: 1 }}>Posts</Typography>
            {data.me.posts.length ? (
              data.me.posts.map((post) => (
                <div key={post._id}>
                  <h3>{post.postText}</h3>
                  <p>Author: {post.postAuthor}</p>
                  {post.postAuthor === data.me.username && (
                  <>
                  <button className="deleteButton" onClick={() => handleDeletePost(post._id)} >Delete</button>
                  <button className="editButton">Edit</button>
                  </>
                  )}
                  <button className="likeButton">like</button>
                  <button
                    className="commentButton"
                    onClick={() => toggleCommentBox(post._id)}
                  >
                    comment
                  </button>
                  {commentBoxStates[post._id] && (
                    <div>
                      <TextField
                        id={`comment-textfield-${post._id}`}
                        label="Add a comment"
                        value={commentText}
                        onChange={(event) => setCommentText(event.target.value)}
                      />
                      <Button onClick={handleCommentSubmit}>
                        Submit Comment
                      </Button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <h1>No posts at the moment</h1>
            )}
            {/* {postItems} */}
            <Typography sx={{ flex: 1 }}>Create A Post</Typography>
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
        </Grid>
      </Grid>
    </Sheet>
  );
}


//Saved for when the Friends part works for get_me query
{
  /* {data.me.friends.length ? (
            data.me.friends.map((friend) => (
              <div key={friend._id}>
                <h3>{friend.firstname}</h3>
              </div>
            ))
          ) : (
            <h1>No Friends at the moment</h1>
          )} */
}
