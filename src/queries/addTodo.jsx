import { gql } from "@apollo/client";

export const TODO_LIST = gql`
  query Book {
    title
    author
  }
`;

export const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      type
    }
  }
`;
