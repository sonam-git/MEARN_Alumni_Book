import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { Tabs, Tab } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import headerImage from '../assets/images/light-coding-background.jpg';
import Login from './Login';
import Signup from './Signup';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    position: 'fixed', // Set the position to fixed
    zIndex: theme.zIndex.drawer + 1, // Ensure the navbar appears above other elements
  },
  
}));

export const Navbar = () => {
  const classes = useStyles();
  const [value, setValue] = useState('one');
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleShowLogin = (event) => {
    event.preventDefault();
    setShowLogin(true);
    setShowSignup(false)
  }

  const handleShowSignup = (event) => {
    event.preventDefault();
    setShowSignup(true);
    setShowLogin(false);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  return (
    <div className={classes.root}>
    
      <AppBar 
      className={classes.appBar}
      style={{
        background: `url(${headerImage})`
      }}
      >
        <Toolbar>
          <IconButton 
          edge="start" 
          className={classes.menuButton} 
          aria-label="menu"
          style={{
            color: 'black'
          }}
          >
            <MenuIcon/>
          </IconButton>
          <Typography 
          variant="h6" 
          className={classes.title} 
          style={{
            color: 'black',
            fontFamily: 'monospace',
            fontSize: "30px"
          }}
          >
            Alumni Books
          </Typography>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
            TabIndicatorProps={{
              style: {
                backgroundColor: value === "one" ? "#434642" : "#434642",
              },
            }}
          >
            <Tab value="two" label="Login" 
            onClick={handleShowLogin}
            style={{
              color: 'black',
              fontFamily: 'monospace',
              fontSize: "20px",
            }}/>
            <Tab value="three" label="Sign Up"
            onClick={handleShowSignup} 
            style={{
              color: 'black',
              fontFamily: 'monospace',
              fontSize: "20px",
            }}/>
          </Tabs>
        </Toolbar>
      </AppBar>
      {showLogin && <Login />}
      {showSignup && <Signup />}
    </div>
  );
};

export default Navbar;