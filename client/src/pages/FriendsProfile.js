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
import { GET_ME } from "../utils/queries";
import { GET_USER } from "../utils/queries";
import { ADD_POST } from "../utils/mutations";
import { REMOVE_POST } from "../utils/mutations";
import { ADD_COMMENT } from "../utils/mutations";
import { UPDATE_POST } from "../utils/mutations";
import { REMOVE_FRIEND} from "../utils/mutations"; 
import {GET_USERS } from "../utils/queries"
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
import AuthService from "../utils/auth";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'; 

//Refetch queries 
//cache update 
const Profile = ({ updatePostAndCommentsData }) => {
  const { loading: loadingMe, data: dataMe, error: errorMe } = useQuery(GET_ME);
  const { userId } = useParams();
  const loggedInUserId = AuthService.getProfile().data._id;
  const isOwnProfile = userId === loggedInUserId;
  const {
    loading: loadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery(GET_USER, {
    variables: { userId },
  });
  const posts = isOwnProfile ? dataMe?.me?.posts : dataUser?.user?.posts;

  const [postText, setPostText] = useState("");
  const [addPost] = useMutation(ADD_POST);
  const [commentText, setCommentText] = useState("");
  const [commentBoxStates, setCommentBoxStates] = useState({});
  const [removePost] = useMutation(REMOVE_POST);
  const [addComment] = useMutation(ADD_COMMENT);
  const [updatePost] = useMutation(UPDATE_POST);
  const [removeFriendMutation] = useMutation(REMOVE_FRIEND, {
    refetchQueries: [{ query: GET_USERS }],
  });
  const [editPostId, setEditPostId] = useState(null);
  const [editPostText, setEditPostText] = useState("");

  const [activeTab, setActiveTab] = useState(1);

  const [showMyPost, setShowMyPost] = useState(true); // Initially show My Post tab content
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showFriendsList, setShowFriendsList] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    switch (newValue) {
      case 1:
        handleShowMyPost();
        break;
      case 2:
        handleShowCreatePost();
        break;
      case 3:
        handleShowFriendsList();
        break;
      default:
        break;
    }
  };

  const handleShowMyPost = () => {
    setShowMyPost(true);
    setShowCreatePost(false);
    setShowFriendsList(false);
  };

  const handleShowCreatePost = () => {
    setShowMyPost(false);
    setShowCreatePost(true);
    setShowFriendsList(false);
  };

  const handleShowFriendsList = () => {
    setShowMyPost(false);
    setShowCreatePost(false);
    setShowFriendsList(true);
  };
  // Function to update the data in Dashboard.js
  const handleCommentsIconClick = (postId) => {
    if (isOwnProfile && !loadingMe && dataMe) {
      // Find the specific post using postId
      // const me = dataMe.me;
      const post = dataMe.me.posts.find((post) => post._id === postId);

      if (post) {
        // Fetch comments data for the specific post
        const commentsData = post.comments;

        const postAndCommentsData = {
          // Create the postAndCommentsData objec
          me: dataMe.me,
          postId: postId,
          post: post,
          comments: commentsData,
        };
        // Pass the data to the Dashboard.js component by calling the function
        updatePostAndCommentsData(postAndCommentsData);
      }
    } else if (!isOwnProfile && !loadingUser && dataUser) {
      const post = dataUser.user.posts.find((post) => post._id === postId);

      if (post) {
        // Fetch comments data for the specific post
        const commentsData = post.comments;

        const postAndCommentsData = {
          user: dataUser.user,
          postId: postId,
          post: post,
          comments: commentsData,
        };
        // Pass the data to the Dashboard.js component by calling the function
        updatePostAndCommentsData(postAndCommentsData);
      }
    }
  };

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

  if (loadingMe || loadingUser) return "Loading...";

  if (errorMe || errorUser)
    return (
      <div>
        Error! {errorMe?.message} {errorUser?.message}
      </div>
    );
  console.log(dataMe);
  console.log(dataUser);

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

  const handlePostUpdate = async (postId, postText) => {
    try {
      await updatePost({
        variables: { postId: editPostId, postText: editPostText },
      });

      console.log("Post updated successfully");
      setEditPostId(null); // Reset the editing post id
      setEditPostText(""); // Clear the post text
      window.location.reload();
    } catch (error) {
      console.error("Error updating post:", error);
    }
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
          src={dataMe.me.image}
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
          {dataMe.me.firstname} {dataMe.me.lastname}
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
            value={2}
            label="Create +"
            sx={{
              fontFamily: "monospace",
              fontSize: "20px",
              color: showCreatePost === true ? "#2ACAEA" : " ",
              border: showCreatePost === true ? "solid" : "",
              borderRadius: showCreatePost === true ? "10px" : "",
              borderColor: showCreatePost === true ? "#006EB3" : "",
              backgroundColor: "transparent",
            }}
          >
            Create +
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
          {isOwnProfile ? (
            dataMe.me.posts.length ? (
              dataMe.me.posts.map((post) => (
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
                  key={post._id}
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
                          src={dataMe.me.image}
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
                          {post.postAuthor}
                        </Typography>
                      </Box>
                      <CardActions
                        buttonFlex="0 1 120px"
                        sx={{ padding: "15px" }}
                      >
                        {isOwnProfile && (
                          <>
                            <IconButton
                              variant="solid"
                              color="danger"
                              onClick={() => handleDeletePost(post._id)}
                              sx={{
                                marginRight: "10px",
                                paddingLeft: "20px",
                                paddingRight: "20px",
                              }}
                            >
                              <DeleteForeverIcon />
                              Delete
                            </IconButton>
                            <IconButton
                              variant="solid"
                              color="primary"
                              onClick={() => {
                                setEditPostId(post._id);
                              }}
                              sx={{
                                marginRight: "5px",
                                paddingLeft: "20px",
                                paddingRight: "20px",
                              }}
                            >
                              <EditIcon />
                              Edit
                            </IconButton>
                          </>
                        )}
                      </CardActions>
                    </Box>
                    <hr style={{ borderColor: "#006EB3", width: "100%" }} />
                    <CardContent sx={{ padding: "20px", height: "150px" }}>
                      <Typography level="h4" fontWeight="lg" color="primary">
                        {post.postText}
                      </Typography>
                    </CardContent>
                    <CardActions
                      buttonFlex="0 1 120px"
                      sx={{ padding: "15px" }}
                    >
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
                          badgeContent={dataMe.me.username.length}
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
                          handleCommentsIconClick(post._id);
                          toggleCommentBox(post._id);
                        }}
                      >
                        <Badge
                          color="neutral"
                          badgeContent={post.comments.length}
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
                        {new Date(
                          parseInt(post.createdAt)
                        ).toLocaleDateString()}
                      </Typography>
                    </CardActions>

                    {commentBoxStates[post._id] && (
                      <div>
                        <FormControl>
                          <Textarea
                            id={`comment-textfield-${post._id}`}
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
                                    handleCommentSubmit(post._id);
                                    handleCommentsIconClick(post._id);
                                    toggleCommentBox(post._id);
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

                    {editPostId === post._id &&
                      post.postAuthor === dataMe.me.username && (
                        <div>
                          <FormControl>
                            <Textarea
                              id={`comment-textfield-${post._id}`}
                              label="Edit Your Post"
                              value={editPostText}
                              onChange={(e) => setEditPostText(e.target.value)}
                              placeholder="Edit Your Post......"
                              sx={{
                                height: "150px",
                                width: "95%",
                                margin: "auto",
                                marginBottom: "20px",
                                borderColor: "#006EB3",
                                padding: "15px",
                              }}
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
                                    onClick={handlePostUpdate}
                                  >
                                    Edit Post
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
                Click "Create +" & Start Posting!
              </Typography>
            )
          ) : dataUser.user.posts.length ? (
            dataUser.user.posts.map((post) => (
              <div key={post._id}>
                <h3>{post.postText}</h3>
                <p>{post.postAuthor}</p>
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

      {showCreatePost && (
        <Sheet
          style={{
            marginTop: "20px",
            width: "100%",
            backgroundColor: "transparent",
          }}
        >
          <div>
            <FormControl>
              <Textarea
                label="Add a comment"
                placeholder="What is on your mind......"
                sx={{
                  height: "250px",
                  width: "95%",
                  margin: "auto",
                  marginBottom: "20px",
                  border: "solid",
                  borderColor: "#006EB3",
                  padding: "15px",
                }}
              >
                {" "}
                onChange={(event) => setPostText(event.target.value)}
              </Textarea>
              endDecorator=
              {
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
                  <Button onClick={handleFormSubmit} sx={{ ml: "auto" }}>
                    Add Post
                  </Button>
                </Box>
              }
              />
            </FormControl>
          </div>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body3" textAlign="center">
              © The Alumni's {new Date().getFullYear()}
            </Typography>
          </Box>
        </Sheet>
      )}
    </>
  );
};

export default Profile;
