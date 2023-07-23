import React from "react";
import Avatar from '@mui/joy/Avatar';
import FormControl from "@mui/joy/FormControl";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import AspectRatio from '@mui/joy/AspectRatio';
import flowerImage from "../assets/images/galactic-flower.png";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/joy/Typography";
import { Container, Divider } from "@mui/material";
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { ADD_POST } from "../utils/mutations";
import { REMOVE_POST } from "../utils/mutations";
import { ADD_COMMENT } from "../utils/mutations";
import { REMOVE_COMMENT } from "../utils/mutations";
import Header from "../components/Header";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from '@mui/joy/CssBaseline';
import filesTheme from '../containers/Theme';
import { Card, withWidth } from "@material-ui/core";
import CardOverflow from "@mui/joy/CardOverflow";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';


import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';


import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CommentIcon from '@mui/icons-material/Comment';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';


export const Profile = ({ updatePostAndCommentsData, updateDeletePost }) => {
  const { loading, data, error } = useQuery(GET_ME);
  const [postText, setPostText] = useState("");
  const [addPost] = useMutation(ADD_POST);
  const [commentText, setCommentText] = useState("");
  const [commentBoxStates, setCommentBoxStates] = useState({});
  const [removePost] = useMutation(REMOVE_POST);
  const [addComment] = useMutation(ADD_COMMENT);

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

      if (!loading && data) {
        // Find the specific post using postId
        const me = data.me;
        const post = data.me.posts.find((post) => post._id === postId);
    
        if (post) {
          // Fetch comments data for the specific post
          const commentsData = post.comments;
    
          const postAndCommentsData = {
          // Create the postAndCommentsData objec
            me: me,
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
      if (!loading && data) {
        // Find the specific post using postId
        const post = data.me.posts.find((post) => post._id === postId);
    
        if (post) {
          // Fetch comments data for the specific post
    
          const deletePost = await removePost ({
            variables: { postId: postId }
        })
          // Pass the data to the Dashboard.js component by calling the function
          updateDeletePost(deletePost);
        }
      }

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
    <>
    <Typography 
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
        style={{
          textAlign: 'center',
          marginBottom: '20px'
        }}
        startDecorator={<AccountBoxIcon/>}
        >
          Profile
      </Typography>
      
      
      <hr />
      <CardOverflow
        sx={{
          display: 'flex',
          alignItems: 'center', // Center items vertically
          justifyContent: 'center', // Center items horizontally
          borderColor: 'neutral.outlinedBorder',
          py: '20px', // Add some padding on the y-axis
        }}
      >
        <Avatar
          size="lg"
          src={data.me.image}
          sx={{ '--Avatar-size': '200px', border: '4px solid white', }}
        />
        <Typography
          component="h1"
          fontWeight="xl"
          sx={{
            display: 'flex',
            backgroundColor: 'transparent',
            fontSize: '45px',
            ml: '50px', // Add some left margin to create space between Avatar and Typography
          }}
        >
         {data.me.firstname} {data.me.lastname}
        </Typography>
      </CardOverflow>

      <Tabs defaultValue={1} value={activeTab} onChange={handleTabChange} sx={{backgroundColor: 'transparent'}}>
      <TabList>
        <Tab value={1} label="My Post" sx={{fontFamily: 'monospace', fontSize: '20px'}}>My Post</Tab>
        <Tab value={2} label="Create +" sx={{fontFamily: 'monospace', fontSize: '20px'}}>Create +</Tab>
        <Tab value={3} label="Friends" sx={{fontFamily: 'monospace', fontSize: '20px'}}>Friends</Tab>
      </TabList>
    </Tabs>

      {showMyPost && (
        <Sheet style={{ marginBottom: '20px', width: '100%', backgroundColor: 'transparent'}}>
        {data.me.posts.length ? (
          data.me.posts.map((post) => (
            <div style={{ width: "80%", overflow: 'auto', resize: 'horizontal', resize: 'none', margin: 'auto', marginBottom: '20px', marginTop: '20px', backgroundColor: 'transparent' }} key={post._id}>
              <Card variant="neutral" sx={{ width: 200, overflow: 'auto', resize: 'horizontal', backgroundColor: 'transparent' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',}}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px',  }}>
                    <Avatar src={data.me.image} size="lg" sx={{ '--Avatar-size': '50px',}} />
                    <Typography variant="body1" sx={{ marginLeft: '5px', fontSize: '20px', color: 'black', fontFamily: 'monospace'  }}>
                      {post.postAuthor}
                    </Typography>
                  </Box>
                  <CardActions buttonFlex="0 1 120px" sx={{ padding: '15px' }}>
                    <IconButton variant="solid" color="danger" onClick={() => { handleDeletePost(post._id)}} sx={{marginRight: '10px', paddingLeft: '20px', paddingRight: '20px'}}>
                      <DeleteForeverIcon/>
                        Delete
                    </IconButton>
                    <Button variant="solid" color="primary">
                      <EditIcon/>
                      Edit
                    </Button>
                  </CardActions>
                </Box>
                <hr/>
                <CardContent sx={{ padding: '20px', height: '150px' }}>
                  <Typography level="h4" fontWeight="lg" color="primary">
                    {post.postText}
                  </Typography>
                </CardContent>
                {post.postAuthor === data.me.username && (
                  <CardActions buttonFlex="0 1 120px" sx={{ padding: '15px',}}>
                    <IconButton variant="outlined" color="primary" sx={{ marginLeft: '10px', padding: '7px', color: 'gray' }}>
                      <FavoriteBorder/>
                      <span sx={{ marginLeft: '10px'}}>{data.me.username.length}</span>
                    </IconButton>
                    <IconButton variant="outlined" color="primary" sx={{ marginLeft: '10px', padding: '7px', color: 'gray' }}  onClick={() => {
                      handleCommentsIconClick(post._id);
                      toggleCommentBox(post._id);
                      }}
                      >
                      <CommentIcon />
                      <span sx={{ marginLeft: '10px'}}>{post.comments.length}</span>
                    </IconButton>
                    <Typography variant="body2" sx={{ marginLeft: 'auto', display: 'flex', fontSize: '12px' }}>Posted:{new Date(parseInt(post.createdAt)).toLocaleDateString()}</Typography>
                  </CardActions>
                )}
                <Divider />
                {commentBoxStates[post._id] && (
                  <div>

                <FormControl>
                      <Textarea
                         id={`comment-textfield-${post._id}`}
                         label="Add a comment"
                         value={commentText}
                         placeholder="Add a comment......."
                         sx={{
                          height: '150px',
                          width: '95%',
                          margin: 'auto',
                          marginBottom: '20px'
                         }}
                         onChange={(event) => setCommentText(event.target.value)}
                          endDecorator={
                          <Box
                            sx={{
                              display: 'flex',
                              gap: 'var(--Textarea-paddingBlock)',
                              pt: 'var(--Textarea-paddingBlock)',
                              borderTop: '1px solid',
                              borderColor: 'divider',
                              flex: 'auto',
                            }}
                          >
                            <Button
                             sx={{ ml: 'auto' }}
                             onClick={() => {
                              handleCommentSubmit(post._id);
                              handleCommentsIconClick(post._id);
                              toggleCommentBox(post._id);
                            }}
                            >Send</Button>
                          </Box>
                        }
                      />
                    </FormControl>
                  </div>
                )}
              <Divider />
              </Card>
            </div>
          ))
        ) : (
          <Typography style={{ backgroundColor: 'transparent', margin: 'auto', fontSize: '25px'}}>Make Some Friends! Its Empty Here Right Now! </Typography>
        )}
      </Sheet>
      )}
    
    {showCreatePost && (
          <Sheet style={{
            marginTop: '20px',
            width: '100%',
            backgroundColor: 'transparent',
          }}>

      <div>
        <FormControl onSubmit={handleFormSubmit}>
            <Textarea
              label="Add a comment"
              placeholder="What is on your mind......"
              sx={{
                height: '250px',
                width: '95%',
                margin: 'auto',
                marginBottom: '20px'
              }}
              onChange={(event) => setPostText(event.target.value)}
                endDecorator={
                <Box
                  sx={{
                    display: 'flex',
                    gap: 'var(--Textarea-paddingBlock)',
                    pt: 'var(--Textarea-paddingBlock)',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    flex: 'auto',
                  }}
                >
                  <Button
                  sx={{ ml: 'auto' }}>Send</Button>
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

    {showFriendsList && (
      <Sheet style={{
            marginBottom: '20px',
            backgroundColor: 'transparent',
            textAlign: 'center',
            marginTop: '20px'
          }}>
            {data.me.friends.length ? (
            data.me.friends.map((friend) => (
              <div key={friend._id}>
                <h3>{friend.firstname}</h3>
              </div>
            ))
          ) : (
            <Typography style={{ backgroundColor: 'transparent', margin: 'auto', fontSize: '25px'}}>Make Some Friends! Its Empty Here Right Now! </Typography>
          )}
        </Sheet>

    )}
        
       
    </>
  );
}

export default Profile;