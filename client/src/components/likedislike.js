// LikeDislike.js
import React from "react";
import Badge from "@material-ui/core/Badge";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import useHeartCounter from "../utils/heartCounter";
import IconButton from '@mui/joy/IconButton';

const LikeDislike = ({ postId, onLikeToggle }) => {
  const { likeCount, userLiked, handleLikeToggle } = useHeartCounter(postId);
  return (
    <IconButton onClick={() => handleLikeToggle(onLikeToggle)}>
      <Badge badgeContent={likeCount} color="primary" overlap="rectangular">
        {userLiked ? <FavoriteBorder color="primary" /> : <FavoriteBorder />}
      </Badge>
    </IconButton>
  );
};

export default LikeDislike;
