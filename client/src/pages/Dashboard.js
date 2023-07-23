import React, {useState} from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME, GET_USERS } from '../utils/queries';
import { REMOVE_COMMENT } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { Link, useParams, Navigate } from 'react-router-dom';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Divider from '@mui/joy/Divider';
import Sheet from '@mui/joy/Sheet';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import CardCover from '@mui/joy/CardCover';
import articleOneImage from '../assets/images/article-one.webp';
import Avatar from '@mui/joy/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';

// Icons import
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import PersonIcon from '@mui/icons-material/Person';

import CloseIcon from '@mui/icons-material/Close';
import ExploreIcon from '@mui/icons-material/Explore';
import InfoIcon from '@mui/icons-material/Info';
import MessageIcon from '@mui/icons-material/Message';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import ViewCompactAltIcon from '@mui/icons-material/ViewCompactAlt';
import sideImage from '../assets/images/importance.jpg';
import sideImage1 from '../assets/images/opportunities.jpg'


// custom
import filesTheme from '../containers/Theme';
import Header from '../components/Header';
import Layout from '../containers/Layout';
import Connect from '../components/Connect';
import PostList from '../components/PostList';
import Profile from './Profile';
import FriendList from '../components/FriendList';
import Auth from '../utils/auth'

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="primary"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export const Dashboard = () => {

  const [removeComment] = useMutation(REMOVE_COMMENT);
  const [showLogin, setShowLogin] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showPostList, setShowPostList] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [postAndCommentsData, setPostAndCommentsData] = useState(null);
  const [showFriends, setShowFriends] = useState(false); // Initialize showFriends state to false
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [showFriendsOfFriend, setShowFriendsOfFriend] = useState(false);
  const [selectedItem, setSelectedItem] = useState('PostList');

  // logged in user variable
  const loggedInUser = Auth.loggedIn() ? Auth.getProfile().data._id : null;

  const { username } = useParams();

  const { loading, data } = useQuery(GET_USERS,
    {
      variables: { username },
    });

  const users = data?.users || [];

  const filteredUsers = users.filter((user) => user._id !== loggedInUser);
  const friendsArray = users.filter((user) => user.friends); 
  console.log(friendsArray)

  if (Auth.loggedIn() && Auth.getProfile().data._id === username) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const updatePostAndCommentsData = (data) => {
    setPostAndCommentsData(data);
  };

  const handlePersonIconClick = (user) => {
    setSelectedUser(user);
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      // Execute the removeComment mutation and pass the commentId as a variable
      await removeComment({
        variables: { postId, commentId },
      });

      // Perform any necessary actions after successful deletion, such as updating the UI
      console.log("Comment deleted successfully");
      window.location.reload();
    } catch (error) {
      // Handle any errors that occur during the deletion process
      console.error("Error deleting comment:", error);
    }
  };

  // const handleShowLogin = () => {
  //   setShowLogin(true);
  // };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleShowConnect = (event) => {
    event.preventDefault();
    setShowConnect(true);
    setShowPostList(false);
    setShowProfile(false);
  };

  const handleShowPostList = (event) => {
    event.preventDefault();
    setShowPostList(true);
    setShowConnect(false);
    setShowProfile(false);
  };

  const handleShowProfile = (event) => {
    event.preventDefault();
    setShowProfile(true);
    setShowPostList(false);
    setShowConnect(false);
  };
  const handleShowFriends = () => {
    setSelectedFriendId(null); // Reset selectedFriendId when showing the main friends list
    setShowFriends(!true);
    setShowFriendsOfFriend(false); // Hide friends of the clicked friend when showing the main friends list
  };

  // const handlePersonAddIconClick = (event) => {
  //   event.preventDefault();
  //   setIsSheetOpen(true);
  // };

  const handleIsSheetClose = (event) => {
    event.preventDefault();
    setIsSheetOpen(false);
  }
  const handleFriendClick = (friendId) => {
    setSelectedFriendId(friendId); // Set the selectedFriendId to the clicked friend's id
    setShowFriends(false); // Hide the main friends list
    setShowFriendsOfFriend(true);
  };
  return (
    <CssVarsProvider disableTransitionOnChange theme={filesTheme}>
      <CssBaseline />
      {loggedInUser ? (
        // If user is logged In
      <Layout.Root
        sx={{
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
            md: 'minmax(160px, 300px) minmax(600px, 1fr) minmax(300px, 420px)',
          },
          ...(drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          }),
        }}
      >
      <Header/>
        {/* Side Bar Navigations */}
        <Layout.SideNav>
        <List size="sm" sx={{ '--ListItem-radius': '8px', '--List-gap': '4px' }}>
          <ListItem nested>
            <ListSubheader>
              Browse
            </ListSubheader>
            <List
              aria-labelledby="nav-list-browse"
              sx={{
                '& .JoyListItemButton-root': { p: '8px' },
              }}
            >
              <ListItem>
              <ListItemButton 
              onClick={() => handleItemClick('post')}
              >
                <ListItemDecorator >
                  <MessageIcon />
                </ListItemDecorator>
                <ListItemContent
                  selected={selectedItem === 'post'}
                  onClick={handleShowPostList}
                  sx={{
                     color: selectedItem === 'post' ? '#2ACAEA' : 'white', 
                    }}
                >
                  Activity Post
                </ListItemContent>
              </ListItemButton >
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => handleItemClick('connect')}>
                  <ListItemDecorator>
                    <ViewCompactAltIcon/>
                  </ListItemDecorator>
                  <ListItemContent 
                  selected={selectedItem === 'connect'}
                  onClick={handleShowConnect}
                  sx={{
                    color: selectedItem === 'connect' ? '#2ACAEA' : 'white', 
                   }}
                  >Connect With Alumnis</ListItemContent>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => handleItemClick('aboutus')}>
                  <ListItemDecorator sx={{ color: 'neutral.500' }}>
                    <InfoIcon/>
                  </ListItemDecorator>
                  <ListItemContent 
                  selected={selectedItem === 'aboutus'}
                  onClick={handleShowProfile}
                  sx={{
                    color: selectedItem === 'aboutus' ? '#2ACAEA' : 'white', 
                   }}
                  >Profile</ListItemContent>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => handleItemClick('contact')}>
                  <ListItemDecorator sx={{ color: 'neutral.500' }}>
                    <ContactSupportIcon/>
                    </ListItemDecorator>
                    <ListItemContent
                      selected={selectedItem === 'contact'}
                      onClick={handleShowConnect}
                      sx={{
                        color: selectedItem === 'contact' ? '#2ACAEA' : '#29b6f6', 
                      }}
                     >Contacts</ListItemContent>
                  </ListItemButton>
                </ListItem>
              </List>
            </ListItem>

          </List>
        </Layout.SideNav>
        
        {/* Main Page */}
        {/* where all the re-renders happens */}
        <Layout.Main>
        {showConnect && (
            loading ? (
            <div>Loading....</div>
          ) : (
            <Connect
            users={filteredUsers}
            handlePersonIconClick={handlePersonIconClick}
            loggedInUser={loggedInUser} // Pass the loggedInUser prop here
            title="Some Users"
              />
          )
        )}
        {showPostList && <PostList/>}
        {showProfile && 
        <Profile
          updatePostAndCommentsData={updatePostAndCommentsData}
        />}
        </Layout.Main>

        {showProfile && postAndCommentsData && (
          <Sheet
            sx={{
              display: { xs: 'none', sm: 'initial' },
              borderLeft: '1px solid',
              borderColor: 'neutral.outlinedBorder',
            }}
          >
            <div key={postAndCommentsData.post._id}>
              <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px',  }}>
                  <Avatar src={postAndCommentsData.me.image} size="lg" sx={{ '--Avatar-size': '50px',}} />
              </Box>
                <Typography sx={{ flex: 1 }}>
                  {postAndCommentsData.post.postAuthor}
                </Typography>
              </Box>
              {/* Add other components and details related to the selected post */}
            </div>

            <Divider />
            <Typography sx={{ fontSize: '12px', padding: '10px', fontFamily: 'monospace' }}>Posted: {new Date(parseInt(postAndCommentsData.post.createdAt)).toLocaleDateString()}</Typography>
            <Box
              sx={{
                gap: 2,
                p: 2,
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                '& > *:nth-of-ty(odd)': { color: 'text.secondary' },
              }}
            > 
              <Typography level="h6" fontWeight="lg" color="primary" sx={{ width: '100%' }}>
                  {postAndCommentsData.post.postText}
              </Typography>

            </Box>

            <Divider />

            {postAndCommentsData.post.comments?.length === 0 ? (
                <Typography
                  sx={{
                    textAlign: 'center',
                    margin: 'auto',
                    mt: 3,
                  }}
                >No Comments Yet!</Typography>
              ) : (
                <>
                  {postAndCommentsData.post.comments.map((comment) => (
                    <div key={comment._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', border: 'solid', borderRadius: '10px', width: '90%', margin: 'auto', marginTop: '15px'}}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px',  }}>
                        <Avatar src={postAndCommentsData.me.image} size="lg" sx={{ '--Avatar-size': '50px',}} />
                      </Box>
                      <Typography variant="body1" sx={{mt: '10px', fontFamily: 'monospace', width: "85%" }} color="primary">
                        <span style={{ fontWeight: 'bold', fontStyle: 'italic', }}>{comment.commentAuthor}</span> - <span style={{ color: 'white' }}>{comment.commentText}</span>
                        <Typography variant="body2" sx={{ marginRight: 'auto', display: 'flex', fontSize: '12px' }}>Posted: {new Date(parseInt(comment.createdAt)).toLocaleDateString()}</Typography>
                      </Typography>
                      <IconButton variant="outlined" color='danger' sx={{ padding: '5px', height: '20px', border: 'none' }} onClick={() => handleDeleteComment(postAndCommentsData.post._id, comment._id)}>
                        <DeleteIcon/> 
                      </IconButton>
                    </div>
                  ))}
                </>
              )}
          </Sheet>
        )}

        {/* Right Side Profile View for Connect Page */}
        {showConnect && selectedUser &&  ( 
        <Sheet
          sx={{
            display: { xs: 'none', sm: 'initial' },
            borderLeft: '1px solid',
            borderColor: 'neutral.outlinedBorder',
          }}
        >
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ flex: 1 }} key={users._id}>{selectedUser.firstname} {selectedUser.lastname}</Typography>
          </Box>
          <Divider />
          <AspectRatio ratio="21/18">
          <img src={selectedUser.image} alt="User Avatar" />
          </AspectRatio>
          <Box sx={{ p: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography level="body2" mr={1}>
              Profile Description
            </Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              gap: 2,
              p: 2,
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              '& > *:nth-of-ty(odd)': { color: 'text.secondary' },
            }}
          >
             <Typography level="body2">Username</Typography>
            <Typography level="body2" textColor="text.primary">
              {selectedUser.username}
            </Typography>

            <Typography level="body2">Email</Typography>
            <Typography level="body2" textColor="text.primary">
            {selectedUser.email}
            </Typography>

          </Box>
          <Divider />
          <Box sx={{ py: 2, px: 1 }}>
            <Button variant="plain" size="sm" startDecorator={<PersonIcon />} onClick={handleShowFriends}>
            {showFriends ? 'Close Friends List' : 'View Friends List'}
            </Button>
            <Divider sx={{marginBottom: 2}}></Divider>
            {showFriends && <FriendList
            friends={friendsArray} 
            onFriendClick={handleFriendClick}
            />}
          </Box>
        </Sheet>

        )}

         {/* Right Side Profile View for PostList Page*/}
         { showPostList &&  ( 
        <Sheet
          sx={{
            display: { xs: 'none', sm: 'initial' },
            borderLeft: '1px solid',
            borderColor: 'neutral.outlinedBorder',
          }}
        >
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ flex: 1 }}>More Article</Typography>
            <IconButton variant="outlined" color="neutral" size="sm" onClick={handleIsSheetClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 2,
            }}
            >
          <Divider />

            {/* Article One */}
            <Card variant="outlined">
              <CardOverflow
                sx={{
                  borderBottom: '.5px solid',
                  borderColor: 'neutral.outlinedBorder',
                }}
              >
                <AspectRatio ratio="16/9" color="primary">
                <CardCover
                sx={{
                  backgroundImage: `url(${articleOneImage})`,
                  backgroundSize: 'cover',
                  transition: 'transform 0.3s ease',
                      '&:hover': {
                     transform: 'scale(1.05)',
                      },
                }}
                >
                 <Link
                  to="https://www.news-herald.com/2023/04/11/alumni-should-have-active-role-in-inspiring-current-hs-sports-programs-opinion/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </Link>
                </CardCover>
                </AspectRatio>
              </CardOverflow>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography>Alumni should have active role in inspiring current HS sports programs | Opinion</Typography>
                  <Typography level="body3" mt={0.5}>
                    Created By: Chris Lillstrung
                  </Typography>
                  <Typography level="body3" mt={0.5}>
                    Created: Saturday, July 15th 2023
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Box>
        </Sheet>

        )}
      </Layout.Root>

      ) : ( 
        // If user is not logged In
      <Layout.Root
        sx={{
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
            md: 'minmax(160px, 300px) minmax(600px, 1fr) minmax(300px, 420px)',
          },
          ...(drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          }),
        }}
      >
      <Header/>
        {/* Side Bar Navigations */}
        <Layout.SideNav>
        <List size="sm" sx={{ '--ListItem-radius': '8px', '--List-gap': '4px' }}>
          <ListItem nested>
            <ListSubheader>
              Browse
            </ListSubheader>
            <List
              aria-labelledby="nav-list-browse"
              sx={{
                '& .JoyListItemButton-root': { p: '8px' },
              }}
            >
              <ListItem>
              <ListItemButton 
              onClick={() => handleItemClick('post')}
              >
                <ListItemDecorator >
                  <MessageIcon />
                </ListItemDecorator>
                <ListItemContent
                  selected={selectedItem === 'post'}
                  onClick={handleShowPostList}
                  sx={{
                     color: selectedItem === 'post' ? '#2ACAEA' : 'white', 
                    }}
                >
                  Recent Post
                </ListItemContent>
              </ListItemButton >
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => handleItemClick('connect')}>
                  <ListItemDecorator>
                    <ViewCompactAltIcon/>
                  </ListItemDecorator>
                  <ListItemContent 
                  selected={selectedItem === 'connect'}
                  onClick={handleShowConnect}
                  sx={{
                    color: selectedItem === 'connect' ? '#2ACAEA' : 'white', 
                   }}
                  >Alumnis</ListItemContent>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => handleItemClick('aboutus')}>
                  <ListItemDecorator sx={{ color: 'neutral.500' }}>
                    <InfoIcon/>
                  </ListItemDecorator>
                  <ListItemContent 
                  selected={selectedItem === 'aboutus'}
                  onClick={handleShowConnect}
                  sx={{
                    color: selectedItem === 'aboutus' ? '#2ACAEA' : 'white', 
                   }}
                  >About Us</ListItemContent>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => handleItemClick('contact')}>
                  <ListItemDecorator sx={{ color: 'neutral.500' }}>
                    <ContactSupportIcon/>
                    </ListItemDecorator>
                    <ListItemContent
                      selected={selectedItem === 'contact'}
                      onClick={handleShowConnect}
                      sx={{
                        color: selectedItem === 'contact' ? '#2ACAEA' : 'white', 
                      }}
                     >Contacts</ListItemContent>
                  </ListItemButton>
                </ListItem>
              </List>
            </ListItem>

          </List>
        </Layout.SideNav>
        
        {/* Main Page */}
        {/* where all the re-renders happens */}
        <Layout.Main>
        {showConnect && (
            loading ? (
            <div>Loading....</div>
          ) : (
            <Connect
            users={filteredUsers}
            handlePersonIconClick={handlePersonIconClick}
            loggedInUser={loggedInUser} // Pass the loggedInUser prop here
            title="Some Users"
              />
          )
        )}
        {showPostList && <PostList/>}
        </Layout.Main>

        {/* Right Side Profile View for Connect Page */}
        {showConnect &&  ( 
        <Sheet
          sx={{
            display: { xs: 'none', sm: 'initial' },
            borderLeft: '1px solid',
            borderColor: 'neutral.outlinedBorder',
          }}
        >
         <Box
            component="img"
            src={sideImage}
            alt="User Avatar"
            sx={{
              filter: 'brightness(80%)', // Adjust the percentage to control the level of dimness
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
          />
        </Sheet>

        )}

         {/* Right Side Profile View for Explore Page*/}
         { showPostList &&  ( 
        <Sheet
          sx={{
            display: { xs: 'none', sm: 'initial' },
            borderLeft: '1px solid',
            borderColor: 'neutral.outlinedBorder',
          }}
        >
          <AspectRatio ratio="25/60">
          <Box
            component="img"
            src={sideImage1}
            alt="User Avatar"
            sx={{
              filter: 'brightness(80%)', // Adjust the percentage to control the level of dimness
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
          />
          </AspectRatio>
        </Sheet>

        )}
      </Layout.Root>
      )}
    </CssVarsProvider>
  );
}

export default Dashboard;