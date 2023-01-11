import { useMutation, useQuery } from "@apollo/client";
import { ADD_TODO, TODO_LIST } from "../queries/addTodo";

const AddTodo = () => {
  let input;
  const [addTodo, { data, loading, error }] = useMutation(ADD_TODO);
  const { loadingTodos, erroTodos, dataTodos } = useQuery(TODO_LIST);

  if (error) return `Submission error! ${error.message}`;
  if (erroTodos) return `Todos error: ${erroTodos.message}`;

  return (
    <div>
      {loading ? (
        <p>Submitting...</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodo({ variables: { type: input.value } });
            input.value = "";
          }}
        >
          <input
            ref={(node) => {
              input = node;
            }}
          />
          <button type='submit'>Add Todo</button>
        </form>
      )}

      <h4>TODOS</h4>
      {loadingTodos ? <p>Loading todos...</p> : null}
      <ul>
        {dataTodos ? dataTodos.map((i) => <li key={i.id}>{i.type}</li>) : null}
      </ul>
    </div>
  );
};

export default AddTodo;
