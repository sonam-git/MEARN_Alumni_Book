import React from "react";
import Avatar from "@mui/material/Avatar";
import flowerImage from "../assets/images/galactic-flower.png";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/joy/Typography";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { ADD_POST } from "../utils/mutations";
import { REMOVE_POST } from "../utils/mutations";
import { ADD_COMMENT } from "../utils/mutations";
import { REMOVE_COMMENT } from "../utils/mutations";

export default function Profile() {
  const { loading, data, error } = useQuery(GET_ME);
  const [postText, setPostText] = useState("");
  const [addPost] = useMutation(ADD_POST);
  const [commentText, setCommentText] = useState("");
  const [commentBoxStates, setCommentBoxStates] = useState({});
  const [removePost] = useMutation(REMOVE_POST);
  const [addComment] = useMutation(ADD_COMMENT);
  const [removeComment] = useMutation(REMOVE_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPost({
        variables: { postText },
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return "Loading...";

  if (error) return `Error! ${error.message}`;
  console.log(data);

  const toggleCommentBox = (postId) => {
    setCommentBoxStates((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

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

  const handleCommentSubmit = async (postId) => {
    // Perform any necessary actions with the comment text for the specific post
    console.log(`Comment submitted for post ${postId}:`, commentText);

    // Try to submit the comment
    try {
      await addComment({
        variables: { postId, commentText },
      });

      console.log("Comment added successfully");
    } catch (err) {
      console.error("Error adding comment:", err);
    }

    // Clear the comment textbox for the specific post
    setCommentText("");
  };

  const handleDeleteComment = async (postId,commentId) => {
    try {
      // Execute the removeComment mutation and pass the commentId as a variable
      await removeComment({
        variables: { postId,commentId },
      });

      // Perform any necessary actions after successful deletion, such as updating the UI
      console.log("Comment deleted successfully");
      window.location.reload();
    } catch (error) {
      // Handle any errors that occur during the deletion process
      console.error("Error deleting comment:", error);
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
                      <button
                        className="deleteButton"
                        onClick={() => handleDeletePost(post._id)}
                      >
                        Delete
                      </button>
                      <button className="editButton">Edit</button>
                    </>
                  )}

                  <button
                    className="commentButton"
                    onClick={() => toggleCommentBox(post._id)}
                  >
                    comment
                  </button>
                  {post.comments.map((comment) => (
                    <div key={comment._id}>
                      <p>
                        {comment.commentText} - {comment.commentAuthor}
                      </p>
                      {comment.commentAuthor === data.me.username && (
                        <button
                          className="deleteCommentButton"
                          onClick={() => handleDeleteComment(post._id,comment._id)}
                        >
                          Delete Comment
                        </button>
                      )}
                    </div>
                  ))}
                  {commentBoxStates[post._id] && (
                    <div>
                      <TextField
                        id={`comment-textfield-${post._id}`}
                        label="Add a comment"
                        value={commentText}
                        onChange={(event) => setCommentText(event.target.value)}
                      />
                      <Button onClick={() => handleCommentSubmit(post._id)}>
                        Submit Comment
                      </Button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <h1>No posts at the moment</h1>
            )}
            <Typography sx={{ flex: 1 }}>Create a Post</Typography>
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
          </Box>
        </Grid>
        {/* education right box of layout */}
        <Grid item xs={8}>
          <Box>Friends</Box>
          {data.me.friends.length ? (
            data.me.friends.map((friend) => (
              <div key={friend._id}>
                <h3>{friend.firstname}</h3>
              </div>
            ))
          ) : (
            <h1>No Friends at the moment</h1>
          )}
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
