import React from "react";
import Avatar from "@mui/joy/Avatar";
import FormControl from "@mui/joy/FormControl";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_USER } from "../utils/queries";
import { ADD_COMMENT } from "../utils/mutations";
import { REMOVE_FRIEND } from "../utils/mutations";
import { GET_USERS } from "../utils/queries";
import CardOverflow from "@mui/joy/CardOverflow";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Card } from "@mui/joy";
import Badge from "@mui/joy/Badge";
// import { Divider } from "@mui/material";
import { useParams } from "react-router-dom";

import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";

import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import IconButton from "@mui/joy/IconButton";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CommentIcon from "@mui/icons-material/Comment";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

//Refetch queries
//cache update
const Profile = ({ updatePostAndCommentsData }) => {
  const { userId } = useParams();
  const {
    loading: loadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery(GET_USER, {
    variables: { userId },
  });
  const posts = dataUser?.user?.posts;

  const [postText, setPostText] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentBoxStates, setCommentBoxStates] = useState({});
  const [addComment] = useMutation(ADD_COMMENT);
  const [removeFriendMutation] = useMutation(REMOVE_FRIEND, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const [activeTab, setActiveTab] = useState(1);

  const [showMyPost, setShowMyPost] = useState(true); // Initially show My Post tab content

  const [showFriendsList, setShowFriendsList] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    switch (newValue) {
      case 1:
        handleShowMyPost();
        break;
      case 2:
        handleShowFriendsList();
        break;
      default:
        break;
    }
  };

  const handleShowMyPost = () => {
    setShowMyPost(true);
    setShowFriendsList(false);
  };

  const handleShowFriendsList = () => {
    setShowMyPost(false);
    setShowFriendsList(true);
  };
  // Function to update the data in Dashboard.js
  const handleCommentsIconClick = (postId) => {
    if (!loadingUser && dataUser) {
      // Find the specific post using postId
      // const me = dataMe.me;
      const post = dataUser.me.posts.find((post) => post._id === postId);

      if (post) {
        // Fetch comments data for the specific post
        const commentsData = post.comments;

        const postAndCommentsData = {
          // Create the postAndCommentsData objec
          me: dataUser.user,
          postId: postId,
          post: post,
          comments: commentsData,
        };
        // Pass the data to the Dashboard.js component by calling the function
        updatePostAndCommentsData(postAndCommentsData);
      }
    }
  };

  if (loadingUser) return "Loading...";

  if (errorUser) return <div>Error! {errorUser?.message}</div>;

  if (dataUser) {
    console.log("Received data:", dataUser);
  } else {
    console.log("No data received yet");
  }

  const toggleCommentBox = (postId) => {
    setCommentBoxStates((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
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

  // Function to handle removing a friend
  const handleRemoveFriend = (friendId) => {
    removeFriendMutation({
      variables: { friendId },
    })
      .then(() => {
        console.log("Friend removed successfully");
      })
      .catch((error) => {
        console.error("Failed to remove friend:", error.message);
      });
  };

const FriendsProfile = () => {
  return (
    <>
      <Typography
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
        startDecorator={<AccountBoxIcon />}
      >
        Profile
      </Typography>
      <hr />
      <CardOverflow
        sx={{
          display: "flex",
          alignItems: "center", // Center items vertically
          justifyContent: "center", // Center items horizontally
          borderColor: "neutral.outlinedBorder",
          py: "20px", // Add some padding on the y-axis
        }}
      >
        <Avatar
          size="lg"
          src={dataUser.user.image}
          sx={{ "--Avatar-size": "200px", border: "4px solid white" }}
        />
        <Typography
          component="h1"
          fontWeight="xl"
          sx={{
            display: "flex",
            backgroundColor: "transparent",
            fontSize: "45px",
            ml: "50px", // Add some left margin to create space between Avatar and Typography
          }}
        >
          {dataUser.user.firstname} {dataUser.user.lastname}
        </Typography>
      </CardOverflow>

      <Tabs
        defaultValue={1}
        value={activeTab}
        onChange={handleTabChange}
        sx={{ backgroundColor: "transparent" }}
      >
        {/* TAB OPTIONS */}
        <TabList>
          <Tab
            value={1}
            label="My Post"
            sx={{
              fontFamily: "monospace",
              fontSize: "20px",
              color: showMyPost === true ? "#2ACAEA" : " ",
              border: showMyPost === true ? "solid" : "",
              borderRadius: showMyPost === true ? "10px" : "",
              borderColor: showMyPost === true ? "#006EB3" : "",
              backgroundColor: "transparent",
            }}
          >
            My Post
          </Tab>

          <Tab
            value={3}
            label="Friends"
            sx={{
              fontFamily: "monospace",
              fontSize: "20px",
              color: showFriendsList === true ? "#2ACAEA" : " ",
              border: showFriendsList === true ? "solid" : "",
              borderRadius: showFriendsList === true ? "10px" : "",
              borderColor: showFriendsList === true ? "#006EB3" : "",
              backgroundColor: "transparent",
            }}
          >
            Friends
          </Tab>
        </TabList>
      </Tabs>
      {/* WHEN IN FIRST TAB FOR SHOWING POST */}
      {showMyPost && (
        <Sheet
          style={{
            margin: "auto",
            marginTop: "20px",
            width: "80%",
            backgroundColor: "transparent",
          }}
        >
          {dataUser.user.posts.length ? (
            dataUser.user.posts.map((post) => (
              <div
                style={{
                  width: "95%",
                  overflow: "auto",
                  resize: "horizontal",
                  resize: "none",
                  margin: "auto",
                  marginBottom: "20px",
                  marginTop: "20px",
                  backgroundColor: "transparent",
                }}
                key={posts._id}
              >
                <Card
                  sx={{
                    width: "100%",
                    overflow: "auto",
                    resize: "horizontal",
                    backgroundColor: "transparent",
                    border: "solid",
                    borderRadius: "10px",
                    borderColor: "#006EB3",
                    resize: "none",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "15px",
                      }}
                    >
                      <Avatar
                        src={dataUser.user.image}
                        size="lg"
                        sx={{
                          "--Avatar-size": "50px",
                          border: "solid",
                          borderColor: "#2ACAEA",
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          marginLeft: "5px",
                          fontSize: "20px",
                          color: "#2ACAEA",
                          fontFamily: "monospace",
                        }}
                      >
                        {posts.postAuthor}
                      </Typography>
                    </Box>
                    <CardActions
                      buttonFlex="0 1 120px"
                      sx={{ padding: "15px" }}
                    ></CardActions>
                  </Box>
                  <hr style={{ borderColor: "#006EB3", width: "100%" }} />
                  <CardContent sx={{ padding: "20px", height: "150px" }}>
                    <Typography level="h4" fontWeight="lg" color="primary">
                      {posts.postText}
                    </Typography>
                  </CardContent>
                  <CardActions buttonFlex="0 1 120px" sx={{ padding: "15px" }}>
                    <IconButton
                      variant="outlined"
                      color="primary"
                      sx={{
                        marginLeft: "10px",
                        padding: "7px",
                        color: "gray",
                      }}
                    >
                      <Badge
                        color="neutral"
                        badgeContent={dataUser.user.username.length}
                        size="sm"
                      >
                        <FavoriteBorder />
                      </Badge>
                    </IconButton>
                    <IconButton
                      variant="outlined"
                      color="primary"
                      sx={{
                        marginLeft: "10px",
                        padding: "7px",
                        color: "gray",
                      }}
                      onClick={() => {
                        handleCommentsIconClick(posts._id);
                        toggleCommentBox(posts._id);
                      }}
                    >
                      <Badge
                        color="neutral"
                        badgeContent={posts.comments.length}
                        size="sm"
                      >
                        <CommentIcon />
                      </Badge>
                    </IconButton>
                    <Typography
                      variant="body2"
                      sx={{
                        marginLeft: "auto",
                        display: "flex",
                        fontSize: "12px",
                      }}
                    >
                      Posted:
                      {new Date(parseInt(posts.createdAt)).toLocaleDateString()}
                    </Typography>
                  </CardActions>

                  {commentBoxStates[posts._id] && (
                    <div>
                      <FormControl>
                        <Textarea
                          id={`comment-textfield-${posts._id}`}
                          label="Add a comment"
                          value={commentText}
                          placeholder="Add a comment......."
                          sx={{
                            height: "150px",
                            width: "95%",
                            margin: "auto",
                            marginBottom: "20px",
                            borderColor: "#006EB3",
                            padding: "15px",
                          }}
                          onChange={(event) =>
                            setCommentText(event.target.value)
                          }
                          endDecorator={
                            <Box
                              sx={{
                                display: "flex",
                                gap: "var(--Textarea-paddingBlock)",
                                pt: "var(--Textarea-paddingBlock)",
                                borderTop: "1px solid",
                                borderColor: "divider",
                                flex: "auto",
                              }}
                            >
                              <Button
                                sx={{ ml: "auto" }}
                                onClick={() => {
                                  handleCommentSubmit(posts._id);
                                  handleCommentsIconClick(posts._id);
                                  toggleCommentBox(posts._id);
                                }}
                              >
                                Add Comment
                              </Button>
                            </Box>
                          }
                        />
                      </FormControl>
                    </div>
                  )}
                </Card>
              </div>
            ))
          ) : (
            <Typography
              style={{
                width: "80%",
                textAlign: "center",
                backgroundColor: "transparent",
                margin: "auto",
                marginTop: "20px",
                fontSize: "25px",
                border: "solid",
                borderRadius: "10px",
                borderColor: "#006EB3",
              }}
            >
              No posts found!
            </Typography>
          )}
        </Sheet>
      )}
    </>
  );
};
};
export default Profile;
