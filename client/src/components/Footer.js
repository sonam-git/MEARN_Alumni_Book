import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Archive, Favorite, Restore } from '@material-ui/icons';
import headerImage from '../images/light-coding-background.jpg';

const useStyles = makeStyles((theme) => ({
  bottomNavigation: {
    position: 'fixed',
    bottom: 0,
    width: '100vw',
    background: `url(${headerImage})`,
    backgroundSize: "cover"
  },
}));

export const Footer = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(false);

  return (
    <BottomNavigation
      showLabels
      value={value}
      className={classes.bottomNavigation}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction label="Recents" icon={<Restore />} />
      <BottomNavigationAction label="Favorites" icon={<Favorite />} />
      <BottomNavigationAction label="Archive" icon={<Archive />} />
    </BottomNavigation>
  );
};

export default Footer;
