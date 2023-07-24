import React from "react";
import Avatar from "@mui/joy/Avatar";
import FormControl from "@mui/joy/FormControl";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ME, GET_USER } from "../utils/queries";
import CardOverflow from "@mui/joy/CardOverflow";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Card } from "@mui/joy";
import Badge from "@mui/joy/Badge";
// import { Divider } from "@mui/material";
import { useParams } from "react-router-dom";

import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";

import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import IconButton from "@mui/joy/IconButton";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CommentIcon from "@mui/icons-material/Comment";

import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import FriendProfileList from "../components/FriendsProfileList";
import AuthService from "../utils/auth";
import PostFriendsList from "../components/PostFriendsList";


const FriendProfile = () => {
  const { loading: loadingMe, error: errorMe, data: dataMe } = useQuery(GET_ME);
  const { userId } = useParams();
  const {
    loading: loadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery(GET_USER, {
    variables: { userId },
  });
  const userdata = dataUser;
  console.log(dataUser);

   if (loadingMe || loadingUser) return <p>Loading...</p>;
  if (errorMe) return <p>Error! {errorMe.message}</p>;
  if (errorUser) return <p>Error! {errorUser.message}</p>;

  let friendsList = [];
  if (dataMe && dataMe.me && dataMe.me.friends) {
    friendsList = dataMe.me.friends;
  }
  console.log(friendsList);
  //  const friendsList = dataMe.me.friends;
  //  console.log(friendsList);
  return (
    <div>
      <h1>Friends Profile</h1>
      <PostFriendsList posts={userdata.user.posts}/>
    
    </div>
  );  
};

export default FriendProfile;
