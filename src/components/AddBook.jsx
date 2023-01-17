import { useMutation, gql } from "@apollo/client";
import { ADD_TODO } from "../queries/addTodo";
import List from "./List";

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

  if (error) return `Submission error! ${error.message}`;

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

      <List />
    </div>
  );
};

export default AddTodo;
