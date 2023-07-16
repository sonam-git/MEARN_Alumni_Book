import { gql } from '@apollo/client';

// login user mutation
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstname
        lastname
        username
        email
        password
        image
        posts {
          _id
          postText
          postAuthor
          createdAt
          comments {
            _id
            commentText
            commentAuthor
            createdAt
          }
        }
      }
    }
  }
`;

// add user mutation
export const ADD_USER = gql`
  mutation addUser(
    $firstname: String!
    $lastname: String!
    $username: String!
    $email: String!
    $password: String!
    $image: String
  ) {
    addUser(
      firstname: $firstname
      lastname: $lastname
      username: $username
      email: $email
      password: $password
      image: $image
    ) {
      token
      user {
        _id
        firstname
        lastname
        username
        email
        password
        image
        posts {
          _id
          postText
          postAuthor
          createdAt
          comments {
            _id
            commentText
            commentAuthor
            createdAt
          }
        }
      }
    }
  }
`;

// add post mutation
export const ADD_POST = gql`
  mutation addPost($postText: String!) {
    addPost(postText: $postText) {
      _id
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

// add comment mutation
export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      _id
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;
// remove post mutation
export const REMOVE_POST = gql`
  mutation removePost($postId: ID!) {
    removePost(postId: $postId) {
      _id
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

// remove comment mutation
export const REMOVE_COMMENT = gql`
  mutation removeComment($postId: ID!, $commentId: ID!) {
    removeComment(postId: $postId, commentId: $commentId) {
      _id
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;
