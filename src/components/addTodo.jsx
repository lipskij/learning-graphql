import { useMutation, useQuery } from "@apollo/client";
import { ADD_TODO, GET_BOOKS } from "../queries/addTodo";

// page that refeches query DONE

// page that modifies cache
// optimistic UI

const AddTodo = () => {
  let input;
  const [addBook, { loading, error }] = useMutation(ADD_TODO, {
    refetchQueries: [GET_BOOKS],
  });

  const {
    loadingTodos,
    erroTodos,
    data: dataTodos,
  } = useQuery(GET_BOOKS, {
    fetchPolicy: "cache-only",
  });

  console.log(dataTodos);
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
            addBook({ variables: { title: input.value, author: "Testing" } });
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
        {dataTodos?.books
          ? dataTodos?.books.map((i, index) => (
              <li key={i.title + index}>{i.title}</li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default AddTodo;
