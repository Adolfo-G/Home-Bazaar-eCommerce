const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {
    _id: ID
    username: String
    email:String
    listings: [Listing]!
  }

  type Listing{
    _id:ID
    username: String
    imageRef: Int
    item:String
    description:String
    stock:Int
    price:String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(email:String!): User
    listings:[Listing]
    listing(username:String!):[Listing]
  }

  type Mutation {
    addListItem(
      username: String!,
      imageRef: Int,
      item: String!,
      description: String!,
      stock: Int!,
      price: String!): Listing
    editListItem(
      itemId:ID!
      username: String!,
      imageRef: Int,
      item: String!,
      description: String!,
      stock: Int!,
      price: String!): Listing
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
