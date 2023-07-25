import React, {useState} from "react";
import Typography from "@mui/joy/Typography";
import Textarea from '@mui/joy/Textarea';
import FormControl from "@mui/joy/FormControl";
import MessageIcon from "@mui/icons-material/Message";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import { useQuery} from "@apollo/client";
import { Divider } from "@mui/material";
import Auth from "../utils/auth";
import { GET_USERS } from "../utils/queries";
import { ADD_COMMENT } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import IconButton from '@mui/joy/IconButton';
import Badge from '@mui/joy/Badge';
import CommentIcon from '@mui/icons-material/Comment';
import CheckIcon from '@mui/icons-material/Check';


// Makes the first letter of firstname and lastname to always be capital
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
//pass props decunstructed from dashboard commentText commentBoxStates and two functions
export const PostList = ({ updateActivityPostAndCommentsData }) => {
  
  // Define the GET_POSTS query to retrieve posts from all users

  // Fetch the posts using useQuery
  const { loading, error, data } = useQuery(GET_USERS);
  const [commentText, setCommentText] = useState("");
  const [commentBoxStates, setCommentBoxStates] = useState({});
  const [addComment] = useMutation(ADD_COMMENT);

  const handleActivityCommentsIconClick = (postId) => {
    if (!loading && data?.users) {
      // Find the specific post using postId
      const users = data.users;
      console.log(users)
      const post = users
        .flatMap((user) => user.posts) // Flatten the posts array from all users
        .find((post) => post._id === postId);

      if (post) {
        // Fetch comments data for the specific post
        const commentsData = post.comments;

        const postAuthorUser = users.find((user) => user.username === post.postAuthor);

        const commentAuthorUsers = commentsData.map((comment) =>
        users.find((user) => user.username === comment.commentAuthor)
      );

        const activityPostAndCommentsData = {
          // Create the postAndCommentsData object
          users: users,
          postId: postId,
          post: post,
          comments: commentsData,
          postAuthorUser: postAuthorUser,
          commentAuthorUsers: commentAuthorUsers, 
        };
        // Pass the data to the Dashboard.js component by calling the function
        updateActivityPostAndCommentsData(activityPostAndCommentsData);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Sort the posts from all users by createdAt field (newest to oldest)
  const posts = data.users.flatMap((user) => user.posts);
  posts.sort((a, b) => parseInt(b.createdAt) - parseInt(a.createdAt));

  //functions put them in dashboard parent 
  const toggleCommentBox = (postId) => {
    setCommentBoxStates((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };
 //functions put them in dashboard parent 
  const handleCommentSubmit = async (postId) => {
    // Perform any necessary actions with the comment text for the specific post
    console.log(`Comment submitted for post ${postId}:`, commentText);

    // Try to submit the comment
    try {
      await addComment({
        variables: { postId, commentText},
      });

      console.log("Comment added successfully");
    } catch (err) {
      console.error("Error adding comment:", err);
    }

    // Clear the comment textbox for the specific post
    setCommentText("");
  };


  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <Typography
            level="h1"
            fontWeight="xl"
            fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
            style={{
              textAlign: "center",
              marginBottom: "20px",
            }}
            startDecorator={<MessageIcon />}
          >
            Activity Post
          </Typography>
          <hr />
          <Box
            sx={{
              display: "block",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 2,
            }}
          >
            {/* Posts Individual cards */}
            {posts &&
              posts.map((post) => {
                // Find the post author's user object using the post's postAuthor field
                const postAuthorUser = data.users.find(
                  (user) => user.username === post.postAuthor
                );

                return (
                  <Box
                    sx={{
                      p: 2,
                      width: "100%",
                      bgcolor: "none",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 2,
                      borderRadius: 15,
                      border: 2,
                      marginTop: "20px",
                      borderColor: "#006EB3",
                    }}
                    key={post._id}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {/* Use the user's image URL in the Avatar component */}
                        <Avatar
                          size="lg"
                          src={postAuthorUser?.image} // Use the image URL from the user object
                          sx={{
                            "--Avatar-size": "45px",
                            border: "4px solid white",
                            marginRight: "20px",
                          }}
                        />
                        <Typography
                          variant="body1"
                          sx={{ fontSize: "20px", color: "#2ACAEA", fontFamily: "monospace" }}
                        >
                          {post.postAuthor}
                        </Typography>
                      </Box>
                      {/* Display the comment icon */}
                      <IconButton
                        variant="outlined"
                        color="primary"
                        sx={{ padding: "7px", color: "gray" }}
                        onClick={() => {
                          handleActivityCommentsIconClick(post._id);
                          toggleCommentBox(post._id);
                        }}
                      >
                        <Badge color="neutral" badgeContent={post.comments.length} size="sm">
                          <CommentIcon />
                        </Badge>
                      </IconButton>
                    </Box>

                    <hr style={{ borderColor: "#006EB3", width: "100%" }} />
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {/* Display the post text */}
                      <CheckIcon />
                      <Typography
                        level="h4"
                        fontWeight="lg"
                        color="primary"
                        sx={{ padding: "15px" }}
                      >
                        {post.postText}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ marginLeft: "auto", display: "flex", fontSize: "12px" }}
                      >
                        Posted: {new Date(parseInt(post.createdAt)).toLocaleDateString()}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                  {/* ... (other code) */}
                  </Box>
                    {commentBoxStates[post._id] && (
                      <div sx={{ width: "100%" }}>
                        <FormControl>
                          <Textarea
                            id={`comment-textfield-${post._id}`}
                            label="Add a comment"
                            value={commentText}
                            placeholder="Add a comment......."
                            sx={{
                              height: "150px",
                              margin: "auto",
                              width: "95%",
                              marginTop: "20px",
                              border: "solid",
                              borderColor: "#2ACAEA",
                              padding: "15px",
                            }}
                            onChange={(event) => setCommentText(event.target.value)}
                            endDecorator={
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: "var(--Textarea-paddingBlock)",
                                  pt: "var(--Textarea-paddingBlock)",
                                  borderTop: "2px solid",
                                  borderColor: "divider",
                                  flex: "auto",
                                }}
                              >
                                <IconButton
                                  onClick={() => {
                                    handleCommentSubmit(post._id);
                                    toggleCommentBox(post._id);
                                  }}
                                  variant="outlined"
                                  sx={{ marginLeft: "10px", padding: "7px", color: "gray" }}
                                >
                                  Add Comment
                                </IconButton>
                              </Box>
                            }
                          />
                        </FormControl>
                      </div>
                    )}
                  </Box>
                );
              })}
          </Box>
        </>
      ) : (
        <>
          <Typography
            level="h1"
            fontWeight="xl"
            fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
            style={{
              textAlign: "center",
              marginBottom: "20px",
            }}
            startdecorator={<MessageIcon />}
          >
            Recent Post
          </Typography>
          <hr />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 2,
            }}
          >
            {/* Posts Individual cards */}
            {posts &&
              posts.map((post) => (
                <Card
                  variant="outlined"
                  sx={{
                    "--Card-radius": (theme) => theme.vars.radius.sm,
                    boxShadow: "none",
                  }}
                  key={post._id} // Add unique "key" prop using the "_id" field from data
                >
                  <CardOverflow
                    sx={{
                      borderBottom: ".5px solid",
                      borderColor: "neutral.outlinedBorder",
                    }}
                  >
                    {/* If there's an image field in the post object, you can display it here */}
                    {/* <img src={post.image} alt="Post Image" style={{ width: '100%', height: '275px'}} /> */}
                  </CardOverflow>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ flex: 1, fontWeight: "bold" }}>
                      <Typography>
                        {capitalizeFirstLetter(post.postAuthor)}
                      </Typography>
                    </Box>
                    {/* Display the post date */}
                    <Typography variant="body2">
                      {new Date(parseInt(post.createdAt)).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {/* Display the post text */}
                    <Typography>-- {post.postText}</Typography>
                  </Box>
                </Card>
              ))}
          </Box>
        </>
      )}
    </div>
  );
};

export default PostList;