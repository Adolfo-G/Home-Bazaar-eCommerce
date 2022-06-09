import { gql } from '@apollo/client';
export const QUERY_USERS = gql`
query users{
  users{
      _id
      username
      email
      isListingPublic
      listings{
        _id
        username
        imageRef
        item
        description
        stock
        price
      }
    }
  }
`;
export const QUERY_USER = gql`
query user($email: String!) {
  user(email: $email) {
      _id
      username
      email
      isListingPublic
      listings{
        _id
        username
        imageRef
        item
        description
        stock
        price
      }
    }
  }
`;
export const QUERY_LISTED_USER = gql`
query listedUser($id: ID) {
  listedUser(id: $id) {
      _id
      username
      email
      isListingPublic
      listings{
        _id
        username
        imageRef
        item
        description
        stock
        price
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
      isListingPublic
      listings{
        _id
        username
        imageRef
        item
        description
        stock
        price
      }
    }
  }
`;
export const QUERY_PERSONAL_ITEMS = gql`
query listing($username: String!) {
  listing(username: $username) {
      _id
      username
      imageRef
      item
      description
      stock
      price
    }
  }
`;