import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($email: String!) {
  user(email: $email) {
      _id
      username
      email
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