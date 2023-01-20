import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `
  type Todo {
    id: Int
    title: String
    completed: Boolean
  }

  type Query {
    todos(offset: Int, limit: Int): [Todo]
    count: Int
  }

  type Mutation {
    addTodo(id: Int, title: String, completed: Boolean): Todo
    completeTodo(id: Int): Todo
    removeTodo(id: Int): Todo
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
  // {
  //   id: 3,
  //   title: "Title pagination",
  //   completed: false,
  // },
  // {
  //   id: 4,
  //   title: "Some title",
  //   completed: false,
  // },
  // {
  //   id: 5,
  //   title: "Some title",
  //   completed: false,
  // },
  // {
  //   id: 6,
  //   title: "Some title",
  //   completed: false,
  // },
  // {
  //   id: 7,
  //   title: "Some title",
  //   completed: false,
  // },
  // {
  //   id: 8,
  //   title: "Some title",
  //   completed: false,
  // },
  // {
  //   id: 9,
  //   title: "Some title",
  //   completed: false,
  // },
];

export const resolvers = {
  Query: {
    todos: (_, { offset, limit }) => {
      return todos.slice(offset, limit);
    },
    count: () => {
      return todos.length;
    },
  },
  Mutation: {
    addTodo: async (_, args) => {
      const todo = {
        id: todos.length + 1,
        title: args.title,
        completed: false,
      };

      todos.push(todo);

      return await new Promise((resolveInner) => {
        setTimeout(() => {
          resolveInner(todo);
        }, 1000);
      });
    },

    completeTodo: (_, args) => {
      const todo = todos.find((i) => i.id === args.id);
      todo.completed = true;
      return todo;
    },

    removeTodo: (_, args) => {
      const todo = todos.indexOf(args.id);
      todos.splice(todo, 1);

      return todos;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
