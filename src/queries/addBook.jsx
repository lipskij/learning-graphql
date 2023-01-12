import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query Book {
    books {
      id
      title
      author
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddTodo($id: Int, $title: String!, $author: String!) {
    addBook(id: $id, title: $title, author: $author) {
      id
      title
      author
    }
  }
`;

export const READ_BOOKS = gql`
  query ReadBooks($id: ID!) {
    book(id: $id) {
      id
      title
      author
    }
  }
`;
