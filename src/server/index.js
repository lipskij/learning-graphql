import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `
  type Todo {
    id: Int
    title: String
    completed: Boolean
  }

  type Query {
    todos: [Todo]
  }

  type Mutation {
    addTodo(id: Int, title: String, completed: Boolean): Todo
    completeTodo(id: Int): Todo
  }
`;

const todos = [
  {
    id: 1,
    title: "The Awakening",
    completed: true,
  },
  {
    id: 2,
    title: "City of Glass",
    completed: false,
  },
];

export const resolvers = {
  Query: {
    todos: () => {
      return todos;
    },
  },
  Mutation: {
    addTodo: (_, args) => {
      const todo = {
        id: todos.length + 1,
        title: args.title,
        completed: false,
      };
      todos.push(todo);
      return todo;
    },

    completeTodo: (_, args) => {
      const todo = todos.find((i) => i.id === args.id);
      todo.completed = true;
      return todo;
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
