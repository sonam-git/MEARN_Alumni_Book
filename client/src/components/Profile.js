import React from 'react';
import Avatar from '@mui/material/Avatar';

import flowerImage from '../images/galactic-flower.png';

function Profile() {
    return(
        <Avatar alt="Galactic-flower" src={flowerImage} />
    );
}

export default Profile;