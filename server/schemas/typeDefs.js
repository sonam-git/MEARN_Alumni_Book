// import necessary packages
const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID!
  firstname: String!
  lastname: String!
  username: String!
  email: String!
  posts: [Post]
  friends: [User]
}

type Post {
  _id: ID!
  postText: String!
  postAuthor: String!
  createdAt: String!
  comments: [Comment]
  likes: [Like]
}

type Comment {
  commentText: String!
  commentAuthor: String!
  createdAt: String!
}

type Like {
  username: String!
  createdAt: String!
}

type Auth {
  token: ID!
  user: User
}
type Query {
    users: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(postId: ID!): Post
    me: User
  }

  type Mutation {
    addUser(firstname: String!,lastname: String!,username: String!, email: String!, password: String! ): Auth
    login(email: String!, password: String!): Auth
    addFriend(userId: ID!, friendId: ID!): User
    addPost(postText: String!): Post
    addComment(postId: ID!, commentText: String!): Post
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
    likePost(postId: ID!): Post!
  }
`;

module.exports = typeDefs;
