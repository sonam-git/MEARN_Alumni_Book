// src/utils/heartCounter.js
import { useState, useEffect } from 'react';

const useHeartCounter = (postId) => {
  // Check if there's any saved data in localStorage, otherwise use the initial values (4 likes, not liked)
  const initialLikeCount = parseInt(localStorage.getItem(`likeCount_${postId}`)) || 0;
  const initialUserLiked = localStorage.getItem(`userLiked_${postId}`) === 'true' || false;

  const initialUserLikedPosts = JSON.parse(localStorage.getItem('userLikedPosts')) || {};

  const [userLiked, setUserLiked] = useState(initialUserLikedPosts[postId] ||initialUserLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);


  useEffect(() => {
    // Save the like count and userLiked status to localStorage whenever they change
    localStorage.setItem(`likeCount_${postId}`, likeCount);
    localStorage.setItem(`userLiked_${postId}`, userLiked);

    const updatedUserLikedPosts = { ...initialUserLikedPosts, [postId]: userLiked };
    localStorage.setItem('userLikedPosts', JSON.stringify(updatedUserLikedPosts));
  }, [postId,likeCount, userLiked, initialUserLikedPosts]);

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
