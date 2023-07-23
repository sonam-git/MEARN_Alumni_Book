import React from "react";
import { Link } from 'react-router-dom';
import Box from '@mui/joy/Box';
import { useColorScheme } from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

// Icons import
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import Auth from '../utils/auth'

// custom
import Layout from '../containers/Layout';

function ColorSchemeToggle() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);
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

export const Header = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const handleLogout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const handleHome = (event) => {
    event.preventDefault();
    window.location.reload();
  }

  // Get the login status using Auth.loggedIn()
  const isLoggedIn = Auth.loggedIn();

  return (
    <Layout.Header>
        {isLoggedIn ? (
          <>
           <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
            <IconButton
              variant="outlined"
              size="sm"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              size="sm"
              sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
            >
              <ColorSchemeToggle />
            </IconButton>
            <Typography component="h1" fontWeight="xl">
              Dashboard
            </Typography>
            <Input
          size="sm"
          placeholder="Search anything…"
          startDecorator={<SearchRoundedIcon color="primary" />}
          endDecorator={
            <IconButton variant="outlined" color="neutral">
              <Typography fontWeight="lg" fontSize="sm" textColor="text.tertiary">
                Find
              </Typography>
            </IconButton>
          }
          sx={{
            flexBasis: '500px',
            display: {
              xs: 'none',
              sm: 'flex',
            },
          }}
        />
            </Box>
          </>
        ) : (
          <>
          <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
            <IconButton
              variant="outlined"
              size="sm"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              size="sm"
              sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
            >
              <ColorSchemeToggle />
            </IconButton>
            <Typography component="h1" fontWeight="xl">
              Home : Sign Up For Free!
            </Typography>
            </Box>
          </>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
          <IconButton
            size="sm"
            variant="outlined"
            color="primary"
            sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
          >
            <SearchRoundedIcon />
          </IconButton>
          {isLoggedIn ? (
            <>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
            <Link to="/dashboard" >
             <IconButton
                size="sm"
                variant="outlined"
                color="primary"
                onClick={handleHome}
                style={{
                  padding: '10px',
                }}
              >
                <HomeIcon style={{ marginRight: '5px' }} />
                Home
              </IconButton>
              </Link>
              <Link to="/Profile" >
              <IconButton
                size="sm"
                variant="outlined"
                color="primary"
                aria-label="Apps"
                style={{
                  padding: '10px',
                }}
              >
                <ManageAccountsIcon style={{ marginRight: '5px' }} />
                Profile
              </IconButton>
              </Link>
              <IconButton
                size="sm"
                variant="outlined"
                color="primary"
                style={{
                  padding: '10px',
                }}
                onClick={handleLogout}
              >
                <LogoutIcon style={{ marginRight: '5px' }} />
                Log Out
              </IconButton>
              </Box>
            </>
          ) : (
            <>
            <IconButton
                size="sm"
                variant="outlined"
                color="primary"
                aria-label="Apps"
                style={{
                  padding: '10px',
                }}
                component={Link}
                to="/Login" // Link to the user's profile page
              >
                Login
              </IconButton>
              <IconButton
                size="sm"
                variant="outlined"
                color="primary"
                style={{
                  padding: '10px',
                }}
                component={Link}
                to="/Signup"
              >
                Sign Up
              </IconButton>
              
            </>
          )}
        </Box>
    </Layout.Header>
  );
};

export default Header;