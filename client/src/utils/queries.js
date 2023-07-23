import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    users {
      _id
      firstname
      lastname
      email
      username
      image
    }
  }
`;

export const GET_USERS = gql`
  query getUsers {
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
        likes {
          username
          createdAt
        }
      }
      friends {
        _id
        firstname
        lastname
        username
        email
        image
      }
    }
  }
`;

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
          commentText
          commentAuthor
          createdAt
        }
        likes {
          username
          createdAt
        }
      }
      friends {
        _id
        firstname
        lastname
        username
        email
        image
      }
    }
  }
`;

export const GET_POSTS = gql`
  query getPosts($username: String) {
    posts(username: $username) {
      _id
      postText
      postAuthor
      image
      createdAt
      comments {
        commentText
        commentAuthor
        createdAt
      }
      likes {
        username
        createdAt
      }
    }
  }
`;

export const GET_POST = gql`
  query getPost($postId: ID!) {
    post(postId: $postId) {
      _id
      postText
      postAuthor
      createdAt
      comments {
        commentText
        commentAuthor
        createdAt
      }
      likes {
        username
        createdAt
      }
    }
  }
`;

export const GET_ME = gql`
  query getMe {
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
        likes {
          username
          createdAt
        }
      }
      friends {
        _id
        firstname
        lastname
        username
        email
        image
      }
    }
  }
`;
