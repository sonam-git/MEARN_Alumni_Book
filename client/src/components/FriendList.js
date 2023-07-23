// import { Typography, Grid, Box } from "@mui/material";
// import React from "react";
// import PersonAddIcon from '@mui/icons-material/PersonAdd';

// // Makes the first letter of firstname and lastname to always be capital
// const capitalizeFirstLetter = (string) => {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// };

// const FriendList = ({ friends }) => {
//   if (friends.length === 0) {
//     return <Typography>No Friends for this user</Typography>;
//   }

//   return (
//     <div>
//       <Grid container spacing={2}>
//         {friends.map((friend) => (
//           <Grid item xs={12} key={friend._id}>
//             {/* Your code for displaying friend information */}
//             {/* Replace with your desired UI to display friend information */}
//             <Box
//               sx={{
//                 p: 2,
//                 bgcolor: "black",
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 gap: 2,
//                 borderRadius: 15,
//                 border: 1
//               }}
//             >
//               <Typography >
//                 {capitalizeFirstLetter(friend.firstname)}{" "}
//                 {capitalizeFirstLetter(friend.lastname)}
//               </Typography>
//               <PersonAddIcon />
//             </Box>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// };

// export default FriendList;
// Assuming FriendList.js is the name of the component file
// FriendList.js
import React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import PersonIcon from '@mui/icons-material/Person';

const FriendList = ({ friends, onFriendClick }) => {
  return (
    <List aria-labelledby="friends-list">
      {friends.map((friend) => (
        <ListItem key={friend._id}>
          <ListItemButton onClick={() => onFriendClick(friend._id)}>
            <PersonIcon />
            <ListItemContent>{`${friend.firstname} ${friend.lastname}`}</ListItemContent>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default FriendList;
