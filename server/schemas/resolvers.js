// import necessary packages
const { AuthenticationError } = require("apollo-server-express");
const cloudinary = require("cloudinary").v2;
const { User, Post } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  /************************* QUERIES *************************/
  Query: {
    // returns all users, populating the posts field
    users: async () => {
      try {
        return await User.find()
          .select("firstname lastname username email")
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
          .select("firstname lastname username email")
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
          throw new Error('Post not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    //returns the logged-in user if authenticated,
    me: async (parent, _args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
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
      { firstname, lastname, username, email, password }
    ) => {
      // Create the user with the provided information
      const user = await User.create({
        firstname,
        lastname,
        username,
        email,
        password,
      });
      // signs a token for authentication, and returns the token and user.
      const token = signToken(user);
      return { token, user };
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
        // Find the current user and remove the friend by their ID
        const user = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { friends: friendId } },
          { new: true }
        );

        return user;
      } catch (error) {
        throw new Error("Failed to remove friend");
      }
    },

    // creates a new post with the provided text and the authenticated user's username,
    addPost: async (parent, { postText }, context) => {
      if (context.user) {
        if (postText.trim() === '') {
          throw new Error('Post body must not be empty');
        }
        const post = await Post.create({
          postText,
          postAuthor: context.user.username,
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
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    //removes a post by its postId
    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await Post.findOneAndDelete({
          _id: postId,
          postAuthor: context.user.username, 
        });

        if (!post) {
          throw new Error("Post not found or you are not the author.");
        }

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: postId } } // Use postId instead of post._id
        );

        return post;
      }

      throw new AuthenticationError("You need to be logged in!");
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
            createdAt: new Date().toISOString()
          });
        }
        await post.save();
        return post;
      } else throw new UserInputError('Post not found');
    }
  },
};
// export module
module.exports = resolvers;
