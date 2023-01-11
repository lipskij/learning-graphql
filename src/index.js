import React from "react";
import * as ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App.js";

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  // uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clcpz04k60xv501t923xndw9n/master",
  cache: new InMemoryCache(),
});

// Supported in React 18+
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
