// import necessary packages
const { AuthenticationError } = require("apollo-server-express");
const { User, Post } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  /************************* QUERIES *************************/
  Query: {
    // returns all users, populating the posts field
    users: async () => {
      return User.find().populate("posts");
    },
    // finds a single user by their username, populating the posts field.
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("posts");
    },
    // returns posts, either for a specific user
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    // finds a post by its posttId
    post: async (parent, { postId }) => {
      return Post.findOne({ _id: postId });
    },
    //returns the logged-in user if authenticated,
    me: async (parent, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("thoughts");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  /************************* MUTATIONS *************************/
  Mutation: {
    // creates a new user with the provided information
    addUser: async (
      parent,
      { firstname, lastname, username, email, password, image }
    ) => {
      const user = await User.create({
        firstname,
        lastname,
        username,
        email,
        password,
        image,
      });

      // signs a token for authentication, and returns the token and user.
      const token = signToken(user);
      return { token, user };
    },
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
    // creates a new post with the provided text and the authenticated user's username,
    addPost: async (parent, { postText }, context) => {
      if (context.user) {
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
          posttAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: post._id } }
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
  },
};
// export module
module.exports = resolvers;
