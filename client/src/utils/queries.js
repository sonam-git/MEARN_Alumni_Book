import { gql } from '@apollo/client';

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
<<<<<<< HEAD
=======
      image
>>>>>>> 2577892e991a28eacb5ae745421cdf0ea014d1d2
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
<<<<<<< HEAD
// image not added to the database query 
=======
>>>>>>> 2577892e991a28eacb5ae745421cdf0ea014d1d2
