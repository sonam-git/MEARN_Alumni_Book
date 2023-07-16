import { gql } from '@apollo/client';

// user query
export const GET_USERS = gql`
  query {
    users {
      _id
      firstname
      lastname
      username
      email
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
`;

// single user query
export const GET_USER = gql`
  query getUser($username: String!) {
    user(username: $username) {
      _id
      firstname
      lastname
      username
      email
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
`;

// posts query
export const GET_POSTS = gql`
  query getPosts($username: String) {
    posts(username: $username) {
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

// single post query
export const GET_POST = gql`
  query getPost($postId: ID!) {
    post(postId: $postId) {
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

// logged in user query
export const GET_ME = gql`
  query {
    me {
      _id
      firstname
      lastname
      username
      email
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
`;
