import { useState } from "react";
import { GET_TODO, COMPLETE_TODO, REMOVE_TODO } from "../queries/AddTodo";
import { useQuery, useMutation } from "@apollo/client";

const List = () => {
  const [limit, setLimit] = useState(2);

  const { loadingTodos, errorTodos, data, fetchMore } = useQuery(GET_TODO, {
    variables: {
      offset: 0,
      limit,
    },
    fetchPolicy: "cache-and-network",
  });

  const [completeTodo] = useMutation(COMPLETE_TODO);
  const [removeTodo] = useMutation(REMOVE_TODO);

  if (loadingTodos) return `Loading...`;
  if (errorTodos) return `Todos error: ${errorTodos.message}`;

  console.log(data)
  return (
    <div>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "90%",
        }}
      >
        {data?.todos.map((i) => (
          <li
            style={
              i.completed
                ? {
                    textDecoration: "line-through",
                  }
                : {
                    textDecoration: "none",
                  }
            }
            key={i.id}
          >
            {i.title}

            <button
              style={{
                marginLeft: "1rem",
              }}
              onClick={(e) => {
                e.preventDefault();
                completeTodo({
                  variables: {
                    id: i.id,
                  },
                  optimisticResponse: {
                    completeTodo: {
                      id: i.id,
                      __typename: "Todo",
                      title: i.title,
                      completed: false,
                    },
                  },
                });
              }}
              disabled={i.completed}
            >
              Complete
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                removeTodo({
                  variables: {
                    id: i.id,
                  },
                  // garbage collection
                  update(cache) {
                    cache.evict({
                      id: cache.identify({ id: i.id, __typename: "Todo" }),
                    });
                    cache.gc();
                  },
                  refetchQueries: [GET_TODO],
                });
              }}
            >
              Remove
            </button>
          </li>
        ))}
        <button
          disabled={limit > data?.todos.length}
          onClick={() =>
            fetchMore({
              variables: {
                limit: setLimit(data?.todos.length + 2),
              },
            })
          }
        >
          Load more
        </button>
      </ul>
    </div>
  );
};

export default List;
