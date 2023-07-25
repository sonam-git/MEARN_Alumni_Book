// src/utils/heartCounter.js
import { useState, useEffect } from 'react';

const useHeartCounter = () => {
  // Check if there's any saved data in localStorage, otherwise use the initial values (4 likes, not liked)
  const initialLikeCount = parseInt(localStorage.getItem('likeCount')) || 4;
  const initialUserLiked = localStorage.getItem('userLiked') === 'true' || false;

  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [userLiked, setUserLiked] = useState(initialUserLiked);

  useEffect(() => {
    // Save the like count and userLiked status to localStorage whenever they change
    localStorage.setItem('likeCount', likeCount);
    localStorage.setItem('userLiked', userLiked);
  }, [likeCount, userLiked]);

  const handleLikeToggle = () => {
    setLikeCount((prevCount) => (userLiked ? prevCount - 1 : prevCount + 1));
    setUserLiked((prevState) => !prevState);
  };

  return {
    likeCount,
    userLiked,
    handleLikeToggle,
  };
};

export default useHeartCounter;
