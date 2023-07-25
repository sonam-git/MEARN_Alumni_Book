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
import { GET_ME, GET_POSTS, GET_USER } from "../utils/queries";
import { ADD_COMMENT } from "../utils/mutations";
import { GET_USERS } from "../utils/queries";
import { useParams } from "react-router-dom";
import { GET_POST_WITH_COMMENTS } from "../utils/queries";
import CardOverflow from "@mui/joy/CardOverflow";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Card } from "@mui/joy";
import Badge from "@mui/joy/Badge";

import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";

import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import IconButton from "@mui/joy/IconButton";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CommentIcon from "@mui/icons-material/Comment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

// Makes the first letter of firstname and lastname to always be capital
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const FriendProfile = ({ updateProfilePostAndCommentsData, userId}) => {
  const { loading: loadingMe, error: errorMe, data: dataMe } = useQuery(GET_ME);
  // const { userId } = useParams();
  const {
    loading: loadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery(GET_USER, {
    variables: { userId },
  });
  console.log(dataUser);

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [{ query: GET_POST_WITH_COMMENTS }],
  });
  const [commentText, setCommentText] = useState("");
  const [commentBoxStates, setCommentBoxStates] = useState({});
 

  const [activeTab, setActiveTab] = useState(1);

  const [showMyPost, setShowMyPost] = useState(true); // Initially show My Post tab content
  const [showFriendsList, setShowFriendsList] = useState(false);
  const [showFriendsPost, setShowFriendsPost] = useState(false);
  if (loadingMe || loadingUser) return <p>Loading...</p>;
  if (errorMe) return <p>Error! {errorMe.message}</p>;
  if (errorUser) return <p>Error! {errorUser.message}</p>;
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



  // Find the user with the specified userId
  const handleCommentsIconClick = (postId) => {
    if (!loadingUser && dataUser?.postId) {
      // Find the specific post using postId
      const post = dataUser.user.posts.find((post) => post._id === postId);
  
      if (post) {
        // Fetch comments data for the specific post
        const commentsData = post.comments;
  
        const commentAuthorUsers = commentsData.map((comment) =>
          dataUser.user.find((user) => user.username === comment.commentAuthor)
        );
  
        const profilePostAndCommentsData = {
          // Create the postAndCommentsData object
          user: dataUser.user,
          postId: postId,
          post: post,
          comments: commentsData,
          commentAuthorUsers: commentAuthorUsers,
        };
        // Pass the data to the Dashboard.js component by calling the function
        updateProfilePostAndCommentsData(profilePostAndCommentsData);
        setShowFriendsPost(true);
      }
    }
  };


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
          {dataUser.user.username}'s Profile
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
                        {post.postAuthor}
                      </Typography>
                    </Box>
                  </Box>
                  <hr style={{ borderColor: "#006EB3", width: "100%" }} />
                  <CardContent sx={{ padding: "20px", height: "150px" }}>
                    <Typography level="h4" fontWeight="lg" color="primary">
                      {post.postText}
                    </Typography>
                  </CardContent>
                  {post.postAuthor === dataUser.user.username && (
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
                  )}
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
                </Card>
                {showMyPost && dataUser.user.posts.length ? (
                    dataUser.user.posts.map((post) => (
                      <div
                        key={post._id}
                      >
                          {/* ... Existing card content ... */}
                          {post.postAuthor === dataUser.user.username && (
                            <CardActions buttonFlex="0 1 120px" sx={{ padding: "15px" }}>
                              {/* ... Existing card actions ... */}
                            </CardActions>
                          )}
                          {commentBoxStates[post._id] && (
                            <Sheet
                              sx={{
                                display: { xs: "none", sm: "initial" },
                                position: "fixed",
                                top: 60,
                                right: 0,
                                bottom: 0,
                                width: "415px",
                                borderLeft: "1px solid",
                                borderColor: "neutral.outlinedBorder",
                                overflowY: "auto",
                              }}
                            >
                              <div>
                                <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
                                <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      padding: "10px",
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
                                  </Box>
                                  <Typography
                                    sx={{
                                      flex: 1,
                                      color: "#2ACAEA",
                                      fontFamily: "monospace",
                                    }}
                                  >
                                    {post.postAuthor}
                                  </Typography>
                                </Box>
                                {/* Add other components and details related to the selected post */}
                              </div>

                              <Box
                                sx={{
                                  padding: "10px",
                                  border: "solid",
                                  borderRadius: "10px",
                                  borderColor: "#006EB3",
                                  width: "98%",
                                  margin: "auto",
                                  marginBottom: "15px",
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontSize: "12px",
                                    padding: "15px",
                                    fontFamily: "monospace",
                                  }}
                                >
                                  Posted:{" "}
                                  {new Date(
                                    parseInt(post.createdAt)
                                  ).toLocaleDateString()}
                                </Typography>
                                <Box
                                  sx={{
                                    gap: 2,
                                    p: 2,
                                    display: "grid",
                                    gridTemplateColumns: "auto 1fr",
                                    "& > *:nth-of-ty(odd)": { color: "text.secondary" },
                                  }}
                                >
                                  <Typography
                                    level="h6"
                                    fontWeight="lg"
                                    color="primary"
                                    sx={{ width: "100%" }}
                                  >
                                    {post.postText}
                                  </Typography>
                                </Box>
                              </Box>
                              <hr />
                              <Typography
                                level="h1"
                                fontWeight="m"
                                fontSize="clamp(1rem, 1rem + 2.1818vw, 1rem)"
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                Comments
                              </Typography>
                              <hr />
                                {post.comments?.length === 0 ? (
                                  <Typography
                                    sx={{
                                      textAlign: "center",
                                      margin: "auto",
                                      mt: 3,
                                    }}
                                  >
                                    No Comments Yet!
                                  </Typography>
                                ) : (
                                  <>
                                    {post.comments.map((comment) => (
                                      <div
                                        key={comment._id}
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          padding: "10px",
                                          border: "solid",
                                          borderRadius: "10px",
                                          borderColor: "#2ACAEA",
                                          width: "80%",
                                          margin: "auto",
                                          marginTop: "15px",
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "10px",
                                          }}
                                       >
                                      
                                        </Box>
                                        <Typography
                                          variant="body1"
                                          sx={{
                                            mt: "10px",
                                            fontFamily: "monospace",
                                            width: "85%",
                                          }}
                                          color="primary"
                                        >
                                          <span
                                            style={{ fontWeight: "bold", fontStyle: "italic" }}
                                          >
                                            {comment.commentAuthor}
                                          </span>{" "}
                                          -{" "}
                                          <span style={{ color: "white" }}>
                                            {comment.commentText}
                                          </span>
                                          <Typography
                                            variant="body2"
                                            sx={{
                                              marginRight: "auto",
                                              display: "flex",
                                              fontSize: "12px",
                                            }}
                                          >
                                            Posted:{" "}
                                            {new Date(
                                              parseInt(comment.createdAt)
                                            ).toLocaleDateString()}
                                          </Typography>
                                        </Typography>
                                      </div>
                                    ))}
                                  </>
                                )}
                            </Sheet>
                          )}
                        
                      </div>
                    ))
                  ) : null}
              </div>
            ))
          ) : (
            <Typography
              variant="body2"
              sx={{ textAlign: "center", marginTop: "20px" }}
            >
              No posts found
            </Typography>
          )}
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body3" textAlign="center">
              © The Alumni's {new Date().getFullYear()}
            </Typography>
          </Box>
        </Sheet>
      )}
      {/* displaying friends list  */}
      {showFriendsList && (
        <Sheet
          style={{
            marginBottom: "20px",
            backgroundColor: "transparent",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          {dataUser.user.friends.length ? (
            dataUser.user.friends.map((friend) => (
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
                key={friend._id}
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
                        src={friend.image}
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
                        {capitalizeFirstLetter(friend.firstname)}{" "}
                        {capitalizeFirstLetter(friend.lastname)}
                      </Typography>
                    </Box>
                    <CardActions
                      buttonFlex="0 1 120px"
                      sx={{ padding: "15px" }}
                    >
                      <IconButton
                        variant="solid"
                        color="primary"
                        // onClick={() => handleRemoveFriend(friend._id)}
                        sx={{
                          marginRight: "10px",
                          paddingLeft: "20px",
                          paddingRight: "20px",
                        }}
                      >
                        <PersonAddIcon />
                      </IconButton>
                    </CardActions>
                  </Box>
                </Card>
                
              </div>
            ))
          ) : (
            <Typography
              variant="body2"
              sx={{ textAlign: "center", marginTop: "20px" }}
            >
              No friends found
            </Typography>
          )}
        </Sheet>
      )}      
    </>

    
   
  );
  
  
};

export default FriendProfile;
