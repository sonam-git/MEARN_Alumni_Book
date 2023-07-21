import React, {useState} from 'react';
import { useQuery } from '@apollo/client';
import {  QUERY_PROFILES, GET_ME, GET_USER } from '../utils/queries';
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
import articleTwoImage from '../assets/images/article-two.jpeg';
import articleThreeImage from '../assets/images/article-three.jpg';

// Icons import
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import PersonIcon from '@mui/icons-material/Person';

import CloseIcon from '@mui/icons-material/Close';
import ExploreIcon from '@mui/icons-material/Explore';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import ViewCompactAltIcon from '@mui/icons-material/ViewCompactAlt';

// custom
import filesTheme from '../containers/Theme';
import Header from '../components/Header';
import Layout from '../containers/Layout';
import Connect from '../components/Connect';
import Explore from '../components/Explore';
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

  const [showLogin, setShowLogin] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [showConnect, setShowConnect] = useState(false);
  const [showExplore, setShowExplore] = useState(true);

  const [selectedUser, setSelectedUser] = useState(null);
  

  const [selectedItem, setSelectedItem] = useState('explore');

  const { username } = useParams();

  const { loading, data } = useQuery(QUERY_PROFILES);
  const users = data?.users || [];

  const { loading1, data1 } = useQuery(
    username ? GET_USER : GET_ME,
    {
      variables: { username: username }
    }
  );

  const profile = data1?.me || data1?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data._id === username) {
    return <Navigate to="/me" />;
  }

  if (loading1) {
    return <div>Loading...</div>;
  }


  const handlePersonIconClick = (user) => {
    setSelectedUser(user);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    Auth.logout();
  }

  // const handleShowLogin = () => {
  //   setShowLogin(true);
  // };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleShowConnect = (event) => {
    event.preventDefault();
    setShowConnect(true);
    setShowExplore(false);
  };

  const handleShowExplore = (event) => {
    event.preventDefault();
    setShowExplore(true);
    setShowConnect(false);
  };


  // const handlePersonAddIconClick = (event) => {
  //   event.preventDefault();
  //   setIsSheetOpen(true);
  // };

  const handleIsSheetClose = (event) => {
    event.preventDefault();
    setIsSheetOpen(false);
  }

  return (
    <CssVarsProvider disableTransitionOnChange theme={filesTheme}>
      <CssBaseline />
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
              onClick={() => handleItemClick('explore')}
              >
                <ListItemDecorator >
                  <ExploreIcon />
                </ListItemDecorator>
                <ListItemContent
                  selected={selectedItem === 'explore'}
                  onClick={handleShowExplore}
                  sx={{
                     color: selectedItem === 'explore' ? '#2ACAEA' : 'white', 
                    }}
                >
                  Explore
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
              users={users}
              handlePersonIconClick={handlePersonIconClick}
              title="Some Users"
              />
          )
        )}
        {showExplore && <Explore/>}
        </Layout.Main>

        {/* Right Side Profile View for Connect Page */}
        { showConnect && selectedUser &&  ( 
        <Sheet
          sx={{
            display: { xs: 'none', sm: 'initial' },
            borderLeft: '1px solid',
            borderColor: 'neutral.outlinedBorder',
          }}
        >
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ flex: 1 }} key={profile._id}>{selectedUser.firstname} {selectedUser.lastname}</Typography>
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
              '& > *:nth-child(odd)': { color: 'text.secondary' },
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
            <Button variant="plain" size="sm" startDecorator={<PersonIcon />}>
              View Full Profile
            </Button>
          </Box>
        </Sheet>

        )}

         {/* Right Side Profile View for Explore Page*/}
         { showExplore &&  ( 
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
                  click
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

            {/* Article Two */}
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
                  backgroundImage: `url(${articleTwoImage})`,
                  backgroundSize: 'cover',
                  transition: 'transform 0.3s ease',
                      '&:hover': {
                     transform: 'scale(1.05)',
                      },
                }}
                >
                  <Link
                    to="https://www.jamesgmartin.center/2023/05/undoing-diversity-equity-and-inclusion-requires-alumni-effort/" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    click
                  </Link>
                 
                </CardCover>
                </AspectRatio>
              </CardOverflow>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography>Undoing “Diversity, Equity, and Inclusion” Requires Alumni Effort</Typography>
                  <Typography level="body3" mt={0.5}>
                    Created By: Garland Tucker
                  </Typography>
                  <Typography level="body3" mt={0.5}>
                    Created: Monday, May 29th 2023
                  </Typography>
                </Box>
              </Box>
            </Card>

            {/* Article Three */}
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
                  backgroundImage: `url(${articleThreeImage})`,
                  backgroundSize: 'cover',
                  transition: 'transform 0.3s ease',
                      '&:hover': {
                     transform: 'scale(1.05)',
                      },
                }}
                >
                  <Link
                  to="https://www.bu.edu/articles/2023/5-tips-for-life-after-college-a-guide-to-living-life-as-an-alumni/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  > click</Link>
                </CardCover>
                </AspectRatio>
              </CardOverflow>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography>5 Tips for Life After College: A Guide To Living Life As An Alumni</Typography>
                  <Typography level="body3" mt={0.5}>
                    Created By: Jada Warmington
                  </Typography>
                  <Typography level="body3" mt={0.5}>
                    Posted: Tuesday, May 16th 2023
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Box>
        </Sheet>

        )}
      </Layout.Root>
    </CssVarsProvider>
  );
}

export default Dashboard;