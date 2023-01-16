import { gql } from "@apollo/client";

export const GET_TODO = gql`
  query Todo($offset: Int, $limit: Int) {
    todos(offset: $offset, limit: $limit) {
      id
      title
      completed
    }
  }
`;

export const ADD_TODO = gql`
  mutation AddTodo($id: Int, $title: String!, $completed: Boolean!) {
    addTodo(id: $id, title: $title, completed: $completed) {
      id
      title
      completed
    }
  }
`;

export const COMPLETE_TODO = gql`
  mutation CompleteTodo($id: Int) {
    completeTodo(id: $id) {
      id
      title
      completed
    }
  }
`;

export const REMOVE_TODO = gql`
  mutation RemoveTodo($id: Int) {
    removeTodo(id: $id) {
      id
      title
      completed
    }
  }
`;
