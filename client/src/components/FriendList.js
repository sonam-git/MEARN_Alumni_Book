import { Typography, Grid, Box } from "@mui/material";
import React, {useState} from "react";
import { useMutation } from "@apollo/client";
import { ADD_FRIEND } from "../utils/mutations";
import { GET_USERS } from "../utils/queries";
import Auth from "../utils/auth";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from '@mui/icons-material/Person';


// Makes the first letter of firstname and lastname to always be capital
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const FriendList = ({ friends, handleShowFriendProfile }) => {
  const [addFriendMutation] = useMutation(ADD_FRIEND, {
    refetchQueries: [{ query: GET_USERS }], // Refetch the users after adding a friend
  });


  // logged in user variable
  const loggedInUserId = Auth.loggedIn() ? Auth.getProfile().data._id : null;

  

  // Function to handle adding a friend
  const handleAddFriend = (userId, friendId) => {
    addFriendMutation({
      variables: { userId, friendId },
    })
      .then(() => {
        console.log("Friend added successfully");
      })
      .catch((error) => {
        console.error("Failed to add friend:", error.message);
      });
  };

  return (
    <div>
      {friends.length === 0 ? (
        <Box
          sx={{
            p: 2,
            bgcolor: "black",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            borderRadius: 15,
            border: 1,
            borderColor: '#006EB3'
          }}
        >
          <Typography>No Friends for this User</Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {friends.map((friend) => (
            <Grid item xs={12} key={friend._id}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                  borderRadius: 15,
                  border: 1,
                  borderColor: '#006EB3'
                }}
              >
                <Typography>
                  {capitalizeFirstLetter(friend.firstname)}{" "}
                  {capitalizeFirstLetter(friend.lastname)}
                </Typography>
                <PersonAddIcon
                  onClick={() => handleAddFriend(loggedInUserId, friend._id)}
                  style={{ cursor: "pointer" }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default FriendList;
