import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      profilePic
      posts {
        _id
        postText
        postPic
        createdAt
      }
    }
  }
`;

export const QUERY_POSTS = gql`
  query getPosts {
    posts {
      _id
      postText
      postPic
      postAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_POST = gql`
  query getSinglePost($postId: ID!) {
    post(postId: $postId) {
      _id
      postText
      postPic
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

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      profilePic
      posts {
        _id
        postText
        postAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_CHALLENGE = gql`
query challenge {
  challenge {
    challengeTitle
    challengeDescription
  }
}
`
