import React, { useState } from "react";
import {Link,useParams} from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_POST_WITH_COMMENTS, GET_USERS, GET_ME } from "../utils/queries";
import { REMOVE_COMMENT } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Divider from "@mui/joy/Divider";
import Sheet from "@mui/joy/Sheet";
import Avatar from "@mui/joy/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUser } from "../utils/UserProvider";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonIcon from "@mui/icons-material/Person";


// custom
import filesTheme from "../containers/Theme";
import Header from "../components/Header";
import Layout from "../containers/Layout";
import Connect from "../components/Connect";
import PostList from "../components/PostList";
import Profile from "./Profile";
import FriendList from "../components/FriendList";
import SideNav from "../components/SideNav"
import Auth from "../utils/auth";

// Makes the first letter of firstname and lastname to always be capital
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const Dashboard = () => {
  //declare functions from postlist
  const { userId: userIdFromContext } = useUser();
  console.log(userIdFromContext); //gives you user id

  const [removeComment] = useMutation(REMOVE_COMMENT);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showPostList, setShowPostList] = useState(true);
  const [showFriendProfile, setShowFriendProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [postAndCommentsData, setPostAndCommentsData] = useState(null);
  const [activityPostAndCommentsData, setActivityPostAndCommentsData] =
    useState(null);
  const [profilePostAndCommentsData, setProfilePostAndCommentsData] =
    useState(null);
  const [showFriends, setShowFriends] = useState(false); // Initialize showFriends state to false
  const [selectedItem, setSelectedItem] = useState("post");
  const [friendClick, setFriendClick] = useState("");


  // logged in user variable
  const loggedInUser = Auth.loggedIn() ? Auth.getProfile().data._id : null;

  const { username } = useParams();
  const { loading: loadingMe, error: errorMe, data: dataMe } = useQuery(GET_ME);
  const meData = dataMe;
  console.log(meData);
  const { loading, data } = useQuery(GET_USERS, {
    variables: { username },
  });

  const users = data?.users || [];

  const filteredUsers = users.filter((user) => user._id !== loggedInUser);

  // let { path, url } = useMatch();

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleFriendClick = (e) => {
    setFriendClick(e.target.id);
  };

  const updatePostAndCommentsData = (data) => {
    setPostAndCommentsData(data);
  };

  const updateActivityPostAndCommentsData = (data) => {
    setActivityPostAndCommentsData(data);
  };

  const updateProfilePostAndCommentsData = (dataUser) => {
    setProfilePostAndCommentsData(dataUser);
  }

  const handlePersonIconClick = (user) => {
    setSelectedUser(user);
  };

  const handleDeleteComment = async (postId, commentId) => {
    console.log("postId:", postId);
    try {
      // Execute the removeComment mutation and pass the commentId as a variable
      await removeComment({
        variables: { postId, commentId },
      });
      // Perform any necessary actions after successful deletion, such as updating the UI
      console.log("Comment deleted successfully");
    } catch (error) {
      // Handle any errors that occur during the deletion process
      console.error("Error deleting comment:", error);
    }
  };


  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleShowConnect = (event) => {
    event.preventDefault();
    setShowConnect(true);
    setShowPostList(false);
    setShowProfile(false);
    setShowFriendProfile(false);
  };

  const handleShowPostList = (event) => {
    event.preventDefault();
    setShowPostList(true);
    setShowConnect(false);
    setShowProfile(false);
    setShowFriendProfile(false);
  };

  const handleShowProfile = (event) => {
    event.preventDefault();
    setShowProfile(true);
    setShowPostList(false);
    setShowConnect(false);
    setShowFriendProfile(false);
  };
  const handleShowFriendProfile = (event) => {
    event.preventDefault();
    setShowProfile(false);
    setShowPostList(false);
    setShowConnect(false);
    setShowFriendProfile(true);
  };

  const handleShowFriends = () => {
    setShowFriends(!showFriends);
  };

  const handlePersonAddIconClick = (event) => {
    event.preventDefault();
    setIsSheetOpen(true);
  };

  const handleIsSheetClose = (event) => {
    event.preventDefault();
    setIsSheetOpen(!isSheetOpen);
  };

  return (
    <>
      <CssVarsProvider disableTransitionOnChange theme={filesTheme}>
        <CssBaseline />
        <Layout.Root
          sx={{
            gridTemplateColumns: {
              xs: "1fr",
              sm: "minmax(64px, 200px) minmax(450px, 1fr)",
              md: "minmax(160px, 300px) minmax(600px, 1fr) minmax(300px, 420px)",
            },
            ...(drawerOpen && {
              height: "100vh",
              overflow: "auto",
            }),
          }}
        >
          <Header />
          {/* display the side nav in large screen and top nav in small screen */}
          <SideNav
          selectedItem={selectedItem}
        handleItemClick={handleItemClick}
        handleShowConnect={handleShowConnect}
        handleShowPostList={handleShowPostList}
        handleShowProfile={handleShowProfile}
      />
    
          {/* Main Page */}
          {/* where all the re-renders happens */}
          <Layout.Main>
            {showConnect &&
              (loading ? (
                <div>Loading....</div>
              ) : (
                <Connect
                  users={filteredUsers}
                  handlePersonIconClick={handlePersonIconClick}
                  loggedInUser={loggedInUser} // Pass the loggedInUser prop here
                  title="Some Users"
                />
              ))}

              {showPostList && (
                <PostList
                  updateActivityPostAndCommentsData={
                    updateActivityPostAndCommentsData
                  }
                />
              )}
              {showProfile && (
                <Profile 
                handleFriendClick={handleFriendClick} 
                updatePostAndCommentsData={updatePostAndCommentsData} 
              />
              )}

            </Layout.Main>

            {showProfile && postAndCommentsData && (
              <Sheet
                sx={{
                  display: { xs: "none", sm: "initial" },
                  position: "fixed",
                  top: 60,
                  right: 0,
                  bottom: 0,
                  width: "415px", // Set the desired width for the right panel
                  borderLeft: "1px solid",
                  borderColor: "neutral.outlinedBorder",
                  overflowY: "auto", // Add scrollbar if content exceeds the panel height
                }}
              >
                <div key={postAndCommentsData.post._id}>
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
                        src={postAndCommentsData.me.image}
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
                      {postAndCommentsData.post.postAuthor}
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
                      parseInt(postAndCommentsData.post.createdAt)
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
                      {postAndCommentsData.post.postText}
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
                {postAndCommentsData.post.comments?.length === 0 ? (
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
                    {postAndCommentsData.post.comments.map((comment) => (
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
                          <Avatar
                            src={postAndCommentsData.me.image}
                            size="lg"
                            sx={{
                              "--Avatar-size": "35px",
                              border: "solid",
                              borderColor: "#2ACAEA",
                            }}
                          />
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
                        <IconButton
                          variant="outlined"
                          color="danger"
                          sx={{
                            padding: "2px",
                            height: "10px",
                            border: "none",
                          }}
                          onClick={() =>
                            handleDeleteComment(
                              postAndCommentsData.post._id,
                              comment._id
                            )
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    ))}
                  </>
                )}
              </Sheet>
            )}

            
          {/* Right Side Profile View for Connect Page */}
          {showConnect && selectedUser && (
            <Sheet
              sx={{
                display: { xs: "none", sm: "initial" },
                position: "fixed",
                top: 65,
                right: 0,
                bottom: 0,
                width: "400px", // Set the desired width for the right panel
                borderLeft: "1px solid",
                borderColor: "neutral.outlinedBorder",
                overflowY: "auto", // Add scrollbar if content exceeds the panel height
              }}
            >
              <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center", // Align flex items vertically in the center
                    fontWeight: "bold",
                    fontFamily: "monospace",
                    fontSize: "20px",
                  }}
                  key={users._id}
                >
                  <AccountBoxIcon sx={{ marginRight: "8px" }} />{" "}
                  {/* Add margin to create space between the icon and the name */}
                  {capitalizeFirstLetter(selectedUser.firstname)}{" "}
                  {capitalizeFirstLetter(selectedUser.lastname)}
                </Typography>
              </Box>
              <Divider />
              <AspectRatio ratio="21/18">
                <img src={selectedUser.image} alt="User Avatar" />
              </AspectRatio>
              <Box sx={{ p: 2, display: "flex", gap: 1, alignItems: "center" }}>
                <Typography
                  level="body2"
                  mr={1}
                  sx={{ fontFamily: "monospace", fontSize: "15px" }}
                >
                  Profile Description
                </Typography>
              </Box>
              <Divider />
              <Box
                sx={{
                  gap: 2,
                  p: 2,
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  "& > *:nth-of-ty(odd)": { color: "text.secondary" },
                }}
              >
                <Typography level="body2" sx={{ fontWeight: "bold" }}>
                  Username:
                </Typography>
                <Typography
                  level="body2"
                  textColor="text.primary"
                  sx={{ fontFamily: "monospace", fontSize: "15px" }}
                >
                  {selectedUser.username}
                </Typography>

                <Typography level="body2" sx={{ fontWeight: "bold" }}>
                  Email:
                </Typography>
                <Typography
                  level="body2"
                  textColor="text.primary"
                  sx={{ fontFamily: "monospace", fontSize: "15px" }}
                >
                  {selectedUser.email}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ py: 2, px: 1 }}>
                <Button
                  variant="plain"
                  size="sm"
                  startDecorator={<PersonIcon />}
                  onClick={handleShowFriends}
                >
                  {showFriends ? "Close Friends List" : "View Friends List"}
                </Button>
                <Divider sx={{ marginBottom: 2, marginTop: 2 }}></Divider>
                {showFriends && <FriendList friends={selectedUser.friends} />}
              </Box>
            </Sheet>
          )}

          {/* Right Side Profile View for PostList Page*/}
          {showPostList && activityPostAndCommentsData && (
            <Sheet
              sx={{
                display: { xs: "none", sm: "initial" },
                position: "fixed",
                top: 60,
                right: 0,
                bottom: 0,
                width: "415px", // Set the desired width for the right panel
                borderLeft: "1px solid",
                borderColor: "neutral.outlinedBorder",
                overflowY: "auto", // Add scrollbar if content exceeds the panel height
              }}
            >
              {/* Render the selected post */}

              <div key={activityPostAndCommentsData.post._id}>
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
                      src={activityPostAndCommentsData.postAuthorUser.image}
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
                    {activityPostAndCommentsData.post.postAuthor}
                  </Typography>
                </Box>
                {/* Add other components and details related to the selected post */}
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
                      parseInt(activityPostAndCommentsData.post.createdAt)
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
                      {activityPostAndCommentsData.post.postText}
                    </Typography>
                  </Box>
                </Box>

                {/* Comments */}
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

                {activityPostAndCommentsData.post.comments?.length === 0 ? (
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
                    {activityPostAndCommentsData.post.comments.map(
                      (comment) => (
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
                            <Avatar
                              src={
                                activityPostAndCommentsData.commentAuthorUsers.find(
                                  (user) =>
                                    user.username === comment.commentAuthor
                                ).image
                              }
                              size="lg"
                              sx={{
                                "--Avatar-size": "35px",
                                border: "solid",
                                borderColor: "#2ACAEA",
                              }}
                            />
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
                              style={{
                                fontWeight: "bold",
                                fontStyle: "italic",
                              }}
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
                      )
                    )}
                  </>
                )}
              </div>
            </Sheet>
          )}
        </Layout.Root>
      </CssVarsProvider>
    </>
  );
};

export default Dashboard;
