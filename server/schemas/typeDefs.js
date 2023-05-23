const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    profilePic: String
    posts: [Post]!
  }

  type Challenge {
    _id: ID
    challengeTitle: String
    challengeDescription: String
  }

  type Post {
    _id: ID
    postText: String
    postPic: String
    isChecked: Boolean
    postAuthor: String
    createdAt: String    
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    posts(username: String, isChecked: Boolean): [Post]
    post(postId: ID!): Post
    me: User
    challenge: [Challenge]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addProfilePic(profilePic: String!): User
    addPost(postText: String, postPic: String, isChecked: Boolean!): Post
    addComment(postId: ID!, commentText: String!): Post
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
  }
`;

module.exports = typeDefs;
