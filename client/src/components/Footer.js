import React from 'react';
import { 
    BottomNavigation, 
    BottomNavigationAction 
} from '@material-ui/core';
import {
    Archive , 
    Favorite, 
    Restore
} from '@material-ui/icons';
import headerImage from '../images/light-coding-background.jpg';

export const Footer = () => {
  const [value, setValue] = React.useState(0);
 
  return (
        <BottomNavigation
          showLabels
          value={value}
          style={{
           background: `url(${headerImage})`
        }}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Recents" icon={<Restore />} />
          <BottomNavigationAction label="Favorites" icon={<Favorite />} />
          <BottomNavigationAction label="Archive" icon={<Archive />} />
        </BottomNavigation>
     
  );
}

export default Footer