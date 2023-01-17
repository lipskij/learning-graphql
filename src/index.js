import React from "react";
import * as ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./components/App.js";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  // uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          todos: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
      Todo: {
        fields: {
          liked: {
            read(_, { readField }) {
              const liked = JSON.parse(localStorage.getItem("liked"));

              if (liked) {
                return liked.includes(readField("id"));
              }
              return false;
            },
          },
        },
      },
    },
  }),
  resolvers: {
    Mutation: {
      toggleTodo: (_root, variables, { cache }) => {
        const likes = JSON.parse(localStorage.getItem("liked")) ?? [];
        const value = likes.includes(variables.id);

        if (value) {
          localStorage.setItem(
            "liked",
            JSON.stringify(likes.filter((i) => i !== variables.id))
          );
        }

        if (!value) {
          likes.push(variables.id);
          localStorage.setItem("liked", JSON.stringify(likes));
        }
        cache.evict({
          id: cache.identify({ id: variables.id, __typename: "Todo" }),
          fieldName: "liked",
        });
        cache.gc();
        return null;
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
