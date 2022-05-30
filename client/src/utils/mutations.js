import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username,
        email
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
        username,
        email
      }
    }
  }
`;

export const ADD_LIST_ITEM = gql`
  mutation addListItem(
    $username: String!,
    $imageRef: Int!,
    $item: String!,
    $description: String!,
    $stock: Int!,
    $price: Sting!
    ) {
        addListItem(
          username :$username,
          imageRef :$imageRef,
          item :$item,
          description :$description,
          stock :$stock,
          price :$price
        ) 
      {
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
