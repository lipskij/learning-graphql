import React from "react";
import * as ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App.js";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  // uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Book: {
        keyFields: ["title", "author"],
        fields: {
          title: {
            read(title) {
              return title.charAt(0).toUpperCase() + title.slice(1);
            },
          },
        },
      },
    },
  }),
});

// Supported in React 18+
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
