// LikeDislike.js
import React from "react";
import Badge from "@material-ui/core/Badge";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import useHeartCounter from "../utils/heartCounter";


const LikeDislike = ({ postId, onLikeToggle }) => {
  const { likeCount, userLiked, handleLikeToggle } = useHeartCounter(postId);
  return (
    <span onClick={() => handleLikeToggle(onLikeToggle)}>
  <Badge badgeContent={likeCount} color="primary" overlap="rectangular">
    {userLiked ? <FavoriteBorder color="primary" /> : <FavoriteBorder />}
  </Badge>
</span>
  );
};

export default LikeDislike;
