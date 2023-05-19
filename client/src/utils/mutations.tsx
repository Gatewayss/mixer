import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PROFILEPIC = gql`
  mutation addProfilePic($profilePic: String!) {
    addProfilePic(profilePic: $profilePic) {
      _id
      username
      profilePic         
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($postText: String, $postPic: String) {
    addPost(postText: $postText, postPic: $postPic) {
      _id
      postText
      postPic
      postAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

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
        createdAt
      }
    }
  }
`;
