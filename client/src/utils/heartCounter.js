// heartCounter.js
import { useState } from 'react';

const useHeartCounter = (initialLikeCount = 4, initialUserLiked = false) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [userLiked, setUserLiked] = useState(initialUserLiked);

  const handleLikeToggle = () => {
    if (userLiked) {
      setLikeCount((prevCount) => prevCount - 1);
    } else {
      setLikeCount((prevCount) => prevCount + 1);
    }
    setUserLiked((prevState) => !prevState);
  };

  return {
    likeCount,
    userLiked,
    handleLikeToggle,
  };
};

export default useHeartCounter;
