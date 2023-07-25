import React from 'react';
import IconButton from '@mui/joy/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PostIcon from '@mui/icons-material/PostAdd';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import FriendsIcon from '@mui/icons-material/Groups';

const DrawerContent = ({ open, onClose }) => {
  const handleMenuItemClick = (menu) => {
    // Handle menu item click here
    console.log(`Clicked on ${menu}`);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div>
        {/* Drawer header */}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <List>
          {/* Menu items */}
          <ListItem onClick={() => handleMenuItemClick('Activity Post')}>
            <ListItemIcon>
              <PostIcon />
            </ListItemIcon>
            <ListItemText primary="Activity Post" />
          </ListItem>
          <ListItem  onClick={() => handleMenuItemClick('Connect with Alumni')}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Connect with Alumni" />
          </ListItem>
          <ListItem  onClick={() => handleMenuItemClick('Profile')}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem  onClick={() => handleMenuItemClick('Friends')}>
            <ListItemIcon>
              <FriendsIcon />
            </ListItemIcon>
            <ListItemText primary="Friends" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default DrawerContent;
