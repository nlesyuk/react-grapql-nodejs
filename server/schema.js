const { buildSchema } = require('graphql');

const schema = buildSchema(`

  type User {
    id: ID
    username: String
    age: Int
    posts: [Post]
  }
  type Post {
    id: ID
    title: String
    content: String
  }

  input UserInput {
    id: ID
    username: String!
    age: Int!
    posts: [PostInput]
  }
  input PostInput {
    id: ID
    title: String!
    content: String!
  }


  type Query {
    getAllUsers: [User]
    getUser(id: ID!): User
  }
  type Mutation {
    createUser(input: UserInput): User
  }


`)

module.exports = schema

/*
query {
  getAllUsers {
    id,
    username,
  }
}

mutation {
  createUser(input: {
    username: "Pii2"
    age: 21
  }) {
    id, username,
  }
}
*/