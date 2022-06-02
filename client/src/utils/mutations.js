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
    $imageRef: Int,
    $item: String!,
    $description: String!,
    $stock: Int!,
    $price: String!
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

export const EDIT_LIST_ITEM = gql`
  mutation editListItem(
    $itemId:ID!,
    $username: String!,
    $imageRef: Int,
    $item: String!,
    $description: String!,
    $stock: Int!,
    $price: String!
    ) {
        editListItem(
          itemId:$itemId,
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

export const DELETE_LIST_ITEM = gql`
  mutation deleteItem($itemId: ID!) {
    deleteItem(itemId:$itemId) {
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
