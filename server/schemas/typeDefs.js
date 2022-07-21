const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {
    _id: ID
    username: String
    email:String
    isListingPublic: Boolean
    listings: [Listing]!
    cart: [Listing]!
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
    listedUser(id:ID): User
    listings:[Listing]
    listing(username:String!):[Listing]
    item(id:ID): Listing
  }

  type Mutation {
    addToCart(itemId:ID!, stock:Int!):User
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
    editUserListingStatus(isListingPublic: Boolean): User
    login(email: String!, password: String!): Auth
    deleteItem(itemId: ID!): Listing
  }
`;

module.exports = typeDefs;
