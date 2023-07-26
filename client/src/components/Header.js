import React from "react";
import  { useState } from 'react';
import Box from '@mui/joy/Box';
import { useColorScheme } from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';
import { Grid } from "@mui/material";
import IconButton from '@mui/joy/IconButton';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Auth from '../utils/auth';
import Layout from '../containers/Layout';


const ColorSchemeToggle = ({ onClick, ...props }) => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <IconButton size="sm" variant="plain" color="neutral" disabled />;
  }

  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="plain"
      color="neutral"
      aria-label="toggle light/dark mode"
      {...props}
      onClick={(event) => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
        onClick?.(event);
      }}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
};

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  // Get the login status using Auth.loggedIn()
  const isLoggedIn = Auth.loggedIn();

  return (
    <Layout.Header >
      <Grid container justifyContent="space-between" alignItems="center" >
        {/* Left side */}
        <Grid item>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {/* Hamburger menu icon */}
            <IconButton
              variant="outlined"
              size="sm"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
{/* Conditionally render the SideNav */}
{drawerOpen && (
      <>
      Click
      </>
      )}
            {/* ColorSchemeToggle */}
            <ColorSchemeToggle />

            {/* Heading */}
            <Typography component="h1" fontWeight="xl">
              Alumni Book
            </Typography>
          </Box>
        </Grid>

        {/* Right side */}
        <Grid item>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {isLoggedIn && (
              <IconButton
                size="sm"
                variant="outlined"
                color="primary"
                style={{ padding: '10px' }}
                onClick={handleLogout}
              >
                <LogoutIcon style={{ marginRight: '5px' }} />
                Log Out
              </IconButton>
            )}
          </Box>
        </Grid>
      </Grid>

    </Layout.Header>
  );
};

export default Header;