import { useCallback } from "react";
import {
  GET_TODO,
  COMPLETE_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  GET_TODO_COUNT,
} from "../queries/addTodo";
import { useQuery, useMutation } from "@apollo/client";

const List = () => {
  const { loadingTodos, errorTodos, data, fetchMore } = useQuery(GET_TODO, {
    variables: {
      offset: 0,
      limit: 4,
    },
    fetchPolicy: "cache-and-network",
  });

  const { data: count } = useQuery(GET_TODO_COUNT, {
    pollInterval: 3000,
  });

  const [completeTodo] = useMutation(COMPLETE_TODO);
  const [removeTodo] = useMutation(REMOVE_TODO);
  const [toggleTodo] = useMutation(TOGGLE_TODO);

  const scroolHandler = useCallback(
    (e) => {
      if (!data) return;

      const { scrollTop, scrollHeight, clientHeight } = e.target;

      const pageEnd = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 5;

      if (pageEnd && !loadingTodos) {
        fetchMore({
          variables: {
            offset: data?.todos.length,
            limit: data?.todos.length + 4,
          },
        });
      }
    },
    [data, loadingTodos, fetchMore]
  );

  if (loadingTodos) return `Loading...`;
  if (errorTodos) return `Todos error: ${errorTodos.message}`;

  return (
    <div>
      <p>Todos count: {count?.count ?? 0}</p>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "90%",
          height: "100px",
          overflow: "scroll",
          border: "1px solid grey",
          padding: "1rem",
        }}
        onScroll={(e) => scroolHandler(e)}
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
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleTodo({
                  variables: {
                    id: i.id,
                  },
                });
              }}
            >
              {i.liked ? "UNLIKE" : "LIKE"}
            </button>
          </li>
        ))}
      </ul>
      <button
        disabled={!data?.todos.length}
        onClick={() => {
          fetchMore({
            variables: {
              offset: data?.todos.length,
              limit: data?.todos.length + 4,
            },
          });
        }}
      >
        Load more
      </button>
    </div>
  );
};

export default List;
