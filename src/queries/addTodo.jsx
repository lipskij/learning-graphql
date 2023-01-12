import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query Book {
    books {
      title
      author
    }
  }
`;

export const ADD_TODO = gql`
  mutation AddTodo($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      title
      author
    }
  }
`;
