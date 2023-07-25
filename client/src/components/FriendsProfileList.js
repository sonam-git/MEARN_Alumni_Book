import { Typography, Grid, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_FRIEND } from "../utils/mutations";

import AuthService from "../utils/auth";
import Auth from "../utils/auth";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom";
import FriendProfile from "../pages/FriendProfile";

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
      <h2>Friends</h2>
      {/* Render the list of friends */}
      {friends.map((friend) => (
        <div key={friend._id}>
          <h3 onClick={handleFriendClick} id={friend._id}>
            {friend.username}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default FriendProfileList;
