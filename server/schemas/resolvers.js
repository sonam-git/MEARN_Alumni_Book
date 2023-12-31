// import necessary packages
const { AuthenticationError } = require("apollo-server-express");
const cloudinary = require("cloudinary").v2;
const { User, Post } = require("../models");
const { signToken } = require("../utils/auth");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

// Cloudinary configuration using environment variables
cloudinary.config({
  cloud_name: 'dnuanxqxg',
  api_key: '768784817278892',
  api_secret: 'u9P50V-GFNRIGKXjX4GzcQdYSB4',
});

const resolvers = {
  /************************* QUERIES *************************/
  Query: {
    // returns all users, populating the posts field
    users: async () => {
      try {
        return await User.find()
          .select("firstname lastname username email image")
          .populate("posts")
          .populate("friends");
      } catch (error) {
        throw new Error("Failed to fetch users.");
      }
    },
    // finds a single user by their username, populating the posts field.
    user: async (parent, { userId }) => {
      try {
        return await User.findById(userId)
          .select("firstname lastname username email image")
          .populate("posts")
          .populate("friends");
      } catch (error) {
        throw new Error("User not found.");
      }
    },
    // returns all the posts
    posts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    // finds a post by its posttId
    post: async (parent, { postId }) => {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    //returns the logged-in user if authenticated,
    me: async (parent, _args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .select("firstname lastname username email image")
          .populate("posts")
          .populate("friends");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  /************************* MUTATIONS *************************/
  Mutation: {
    //finds a user by their email
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    // creates a new user with the provided information
    addUser: async (
      parent,
      { firstname, lastname, username, email, password, image }
    ) => {
      try {
        let imageUrl = null;
        // Upload the image to Cloudinary only if an image was provided
        if (image) {
          const { secure_url: uploadedImageUrl } =
            await cloudinary.uploader.upload(image, {
              upload_preset: "logging_preset", // Replace 'logging_preset' with your upload preset name
            });
          imageUrl = uploadedImageUrl;
        }
        // Create the user with the provided information
        const user = await User.create({
          firstname,
          lastname,
          username,
          email,
          password,
          image: imageUrl,
        });
        // signs a token for authentication, and returns the token and user.
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error(error);
        throw new Error("Failed to create user");
      }
    },

    // add friend to your friend list
    addFriend: async (_, { userId, friendId }, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError(
          "You need to be logged in to add a friend."
        );
      }
      const user = await User.findById(userId);
      const friend = await User.findById(friendId);

      // check if the user and friends exist by their id.
      if (!user || !friend) {
        throw new Error("User or friend not found");
      }
      // add the friendId to the friends array only if it does not already exist, preventing duplicate entries.
      user.friends.addToSet(friendId);
      await user.save();

      // return user;
      // Return the updated user document with the new friend added to the friends array
      return User.findById(userId).populate("posts").populate("friends");
    },

    // remove Friends
    removeFriend: async (_, { friendId }, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError(
          "You must be logged in to remove a friend"
        );
      }
      try {
        // Find the current user and populate the friends field with user details
        const user = await User.findById(context.user._id).populate("friends");
    
        // Remove the friend from the friends array
        user.friends.pull(friendId);
    
        // Save the updated user data
        await user.save();
    
        return user;
      } catch (error) {
        throw new Error("Failed to remove friend");
      }
    },

    // creates a new post with the provided text and the authenticated user's username,
    addPost: async (parent, { postText }, context) => {
      if (context.user) {
        if (postText.trim() === "") {
          throw new Error("Post body must not be empty");
        }
        const post = await Post.create({
          postText,
          postAuthor: context.user.username,
          createdAt: new Date().toISOString(),
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { posts: post._id } }
        );

        return post;
      }
      throw new AuthenticationError("You need to be logged in!");
  },
  
    //adds a new comment to a post
    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        try {
          // Find the post by postId
          const post = await Post.findById(postId);

          if (!post) {
            throw new Error("Post not found");
          }

          // Create the new comment object
          const newComment = {
            _id: new mongoose.Types.ObjectId(),
            commentText,
            commentAuthor: context.user.username,
            createdAt: new Date().toISOString(), // Set the current timestamp for createdAt
          };

          // Use $addToSet to add the new comment to the comments array
          await Post.updateOne(
            { _id: postId },
            { $addToSet: { comments: newComment } }
          );

          // Fetch the updated post after the comment is added
          const updatedPost = await Post.findById(postId);

          return updatedPost;
        } catch (error) {
          throw new Error("Error adding comment:", error);
        }
      } else {
        throw new AuthenticationError("You need to be logged in!");
      }
    },

    updatePost: async (_, { postId, postText }, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      try {
        // Find the post by postId
        const post = await Post.findById(postId);

        if (!post) {
          throw new Error("Post not found.");
        }

        // Check if the current user is the author of the post
        if (post.postAuthor !== context.user.username) {
          throw new AuthenticationError("You are not the author of this post.");
        }

        // Update the postText
        post.postText = postText;
        await post.save();

        return post;
      } catch (error) {
        throw new Error("Failed to update the post.");
      }
    },
    //removes a post by its postId
    removePost: async (parent, { postId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      try {
        return Post.findOneAndDelete({_id: postId})
      } catch (error) {
        console.error('Error deleting post:', error);
        throw new Error('Error deleting post.');
      }
    },
    
    //removes a comment from a post
    removeComment: async (parent, { postId, commentId }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // count the like for the post
    likePost: async (_, { postId }, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError("You need to like this post.");
      }
      const post = await Post.findById(postId);

      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          // Post already likes, unlike it
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          // Not liked, like post
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
  },
};
// export module
module.exports = resolvers;
