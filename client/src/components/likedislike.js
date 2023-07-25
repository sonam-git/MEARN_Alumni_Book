// LikeDislike.js
import React from 'react';
import Badge from '@material-ui/core/Badge';
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

const LikeDislike = ({ likeCount, userLiked, onLikeToggle }) => {
  return (
    <Badge badgeContent={likeCount} color="primary">
      <FavoriteBorder color={userLiked ? 'primary' : 'action'} onClick={onLikeToggle} />
    </Badge>
  );
};

export default LikeDislike;
