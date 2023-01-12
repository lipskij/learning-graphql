import React from "react";
import * as ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App.js";
import { READ_BOOKS } from "./queries/addBook.jsx";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  // uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

const { books } = client.readQuery({
  query: READ_BOOKS,
  variables: {
    id: 1,
  },
});

console.log(books);

// Supported in React 18+
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
