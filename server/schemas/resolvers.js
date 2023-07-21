// import necessary packages
const { AuthenticationError } = require("apollo-server-express");
const cloudinary = require('cloudinary').v2;
const { User, Post } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  /************************* QUERIES *************************/
  Query: {
    // returns all users, populating the posts field
    users: async () => {
      return User.find().populate("posts").populate('friends');
    },
    // finds a single user by their username, populating the posts field.
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("posts").populate('friends');
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

    me: async (parent, _args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("posts");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  /************************* MUTATIONS *************************/
  Mutation: {


    

    // creates a new user with the provided information
    addUser: async (
      parent,
      { firstname, lastname, username, email, password}
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
    addFriend: async (_, { userId, friendId }) => {
      const user = await User.findById(userId);
      const friend = await User.findById(friendId);


      if (!user || !friend) {
        throw new Error("User or friend not found");
      }

      user.friends.addToSet(friendId);
      await user.save();

      return user;
    },



    // remove Friends 
    removeFriend: async (_, { friendId }, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to remove a friend');
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
        throw new Error('Failed to remove friend');
      }
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
              comments: { _id: mongoose.Types.ObjectId(),commentText, commentAuthor: context.user.username },
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
        try{
         await Post.findOneAndDelete({
          _id: postId,
          posttAuthor: context.user.username,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: postId } }
        );

        return true;
      } catch (error) {
        console.error("Error deleting post:", error);
        return false; // Return false to indicate failure
      }
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
    likePost: async (_, { postId }, { user }) => {
      if (!user) {
        throw new Error('Not authenticated');
      }

      const post = await Post.findById(postId);

      if (!post) {
        throw new Error('Post not found');
      }

      const existingLike = post.likes.find((like) => like.username === user.username);

      if (existingLike) {
        post.likes = post.likes.filter((like) => like.username !== user.username);
      } else {
        post.likes.push({
          username: user.username,
          createdAt: new Date().toISOString(),
        });
      }

      await post.save();

      return post;
    },
  },

};
// export module
module.exports = resolvers;

/* 

{
  "data": {
    "users": [
      {
        "username": "sjsherpa",
        "_id": "64b1709ecd7e6fe9efb3de50"
      },
      {
        "username": "johndoe",
        "_id": "64b478a14b2b30db9e4af9dc"
      }
    ]
  }
}


*/
