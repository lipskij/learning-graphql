import { useMutation, useQuery, gql } from "@apollo/client";
import { ADD_TODO, COMPLETE_TODO, GET_TODO } from "../queries/AddTodo";

// page that refeches query DONE

// page that modifies cache DONE

// optimistic UI DONE

const AddTodo = () => {
  let input;

  const [addTodo, { loading, error }] = useMutation(ADD_TODO, {
    update(cache, { data: { addTodo } }) {
      cache.modify({
        fields: {
          todos(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: addTodo,
              fragment: gql`
                fragment NewTodo on Todo {
                  id
                  title
                  completed
                }
              `,
            });
            return [...existingTodos, newTodoRef];
          },
        },
      });
    },
  });

  const {
    loadingTodos,
    erroTodos,
    data: dataTodos,
  } = useQuery(GET_TODO, {
    fetchPolicy: "cache-and-network",
  });

  const [completeTodo] = useMutation(COMPLETE_TODO);

  if (error) return `Submission error! ${error.message}`;
  if (erroTodos) return `Todos error: ${erroTodos.message}`;

  console.log(completeTodo);
  return (
    <div>
      {loading ? (
        <p>Submitting...</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodo({
              variables: { title: input.value, completed: false },
              optimisticResponse: {
                addTodo: {
                  id: "temp-id",
                  __typename: "Todos",
                  title: input.value,
                  completed: false,
                },
              },
            });
            input.value = "";
          }}
        >
          <input
            ref={(node) => {
              input = node;
            }}
          />
          <button type='submit'>Add todo</button>
        </form>
      )}

      <h4>TODOS</h4>
      {loadingTodos ? <p>Loading list...</p> : null}
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "90%",
        }}
      >
        {dataTodos?.todos
          ? dataTodos?.todos.map((i) => (
              <li
                key={i.id}
                style={
                  i.completed
                    ? { textDecoration: "line-through" }
                    : {
                        textDecoration: "none",
                      }
                }
              >
                {i.title}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    completeTodo({
                      variables: {
                        id: i.id,
                      },
                    });
                  }}
                  disabled={i.completed}
                >
                  Completed
                </button>
                <button>Remove</button>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default AddTodo;
