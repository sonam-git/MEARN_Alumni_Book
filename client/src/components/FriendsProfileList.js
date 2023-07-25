import { Typography, Grid, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_FRIEND } from "../utils/mutations";

import AuthService from "../utils/auth";
import Auth from "../utils/auth";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import FriendProfile from "../pages/FriendProfile";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

// Makes the first letter of firstname and lastname to always be capital
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const FriendProfileList = ({
  friends,
  updatePostAndCommentsData,
  showPostList,
  activityPostAndCommentsData,
  updateActivityPostAndCommentsData,
}) => {
  const [friendClick, setFriendClick] = useState("");
  const handleFriendClick = (e) => {
    // e.preventDefault;
    setFriendClick(e.target.id);
    console.log(friendClick);
  };
  if (friendClick) {
    return (
      <FriendProfile
        userId={friendClick}
        updatePostAndCommentsData={updatePostAndCommentsData}
        showPostList={showPostList}
        activityPostAndCommentsData={activityPostAndCommentsData}
        updateActivityPostAndCommentsData={updateActivityPostAndCommentsData}
      />
    );
  }
  return (
    <div>
       <Typography
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
        style={{
          textAlign: "left",
          marginBottom: "20px",
        }}
        startDecorator={<AccountBoxIcon />}
      >
        Profile
      </Typography>
      {/* Render the list of friends */}
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
              <PersonIcon
                  onClick={handleFriendClick} id={friend._id}
                  style={{ cursor: "pointer" }}
                />
          </Box>
        </Grid>
      ))}
      </Grid>
    </div>
  );
};

export default FriendProfileList;
