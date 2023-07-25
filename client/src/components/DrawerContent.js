import React from 'react';
import IconButton from '@mui/joy/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const DrawerContent = ({ onClose }) => {
  return (
    <div>
      {/* Drawer content goes here */}
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <p>Drawer content goes here.</p>
    </div>
  );
};

export default DrawerContent;
