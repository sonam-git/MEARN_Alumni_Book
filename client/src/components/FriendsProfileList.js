import { Typography, Grid, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_FRIEND } from "../utils/mutations";

import AuthService from "../utils/auth";
import Auth from "../utils/auth";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom";

// Makes the first letter of firstname and lastname to always be capital
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const FriendProfileList = ({ friends }) => {

  return (
    <div>
      <h2>Friends</h2>
      {/* Render the list of friends */}
      {friends.map((friend) => (
        <div key={friend._id}>
        <Link to={`/FriendProfile/${friend._id}`}>
          <h3>{friend.username}</h3>
          </Link>
          {/* Other friend details... */}
        </div>
      ))}
    </div>
  );
};



export default FriendProfileList;
