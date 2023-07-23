import React, {useState} from 'react';
import { useQuery } from '@apollo/client';
import {  GET_USERS , GET_ME} from '../utils/queries';
import { Link, useParams, Navigate } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles';
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
import Auth from '../utils/auth' //Authentication


// Icons import
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
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
import Profile from '../pages/Profile';
import FriendList from '../components/FriendList';


export const Dashboard = () => {
 
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showPostList, setShowPostList] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showFriends, setShowFriends] = useState(false); // Initialize showFriends state to false
  const [selectedItem, setSelectedItem] = useState('PostList');
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [showFriendsOfFriend, setShowFriendsOfFriend] = useState(false);

// logged in user variable
  const loggedInUser = Auth.loggedIn() ? Auth.getProfile().data._id : null;

  const { username } = useParams();

  const { loading, data } = useQuery(GET_USERS,
    {
      variables: { username },
    });
 

  const users = data?.users || [];
  console.log(users)

  const filteredUsers = users.filter((user) => user._id !== loggedInUser);
  const friendsArray = users.filter((user) => user.friends); 
  console.log(friendsArray)
  

  if (loading) {
    return <div>Loading...</div>;
  }

  const handlePersonIconClick = (user) => {
    setSelectedUser(user);
  };

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
      {Auth.loggedIn() ? (
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
                <ListItemButton onClick={() => handleItemClick('profile')}>
                  <ListItemDecorator sx={{ color: 'neutral.500' }}>
                    <InfoIcon/>
                  </ListItemDecorator>
                  <ListItemContent 
                  selected={selectedItem === 'profile'}
                  onClick={handleShowProfile}
                  sx={{
                    color: selectedItem === 'profile' ? '#2ACAEA' : 'white', 
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
            loggedInUser={Auth.loggedIn} // Pass the loggedInUser prop here
            title="Some Users"
              />
          )
        )}
        {showPostList && <PostList/>}
        {showProfile && <Profile/>}
        </Layout.Main>

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
              :  {selectedUser.username}
            </Typography>

            <Typography level="body2">Email</Typography>
            <Typography level="body2" textColor="text.primary">
            : {selectedUser.email}
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
            {showFriendsOfFriend && (
        <FriendList
          friends={filteredUsers.find((user) => user._id === selectedFriendId)?.friends || []}
          onFriendClick={handleFriendClick}
        />
      )}
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
            loggedInUser={Auth.loggedIn} // Pass the loggedInUser prop here
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

         {/* Right Side Profile View for PostList Page*/}
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