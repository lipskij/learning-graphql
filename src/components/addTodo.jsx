import { useMutation, useQuery, gql } from "@apollo/client";
import { ADD_TODO, GET_BOOKS } from "../queries/addTodo";

// page that refeches query DONE

// page that modifies cache DONE

// optimistic UI DONE

const AddTodo = () => {
  let input;

  const [addBook, { loading, error }] = useMutation(ADD_TODO, {
    update(cache, { data: { addBook } }) {
      cache.modify({
        fields: {
          books(existingBooks = []) {
            const newBooksRef = cache.writeFragment({
              data: addBook,
              fragment: gql`
                fragment NewBook on Book {
                  title
                  author
                }
              `,
            });
            return [...existingBooks, newBooksRef];
          },
        },
      });
    },
  });
  const {
    loadingTodos,
    erroTodos,
    data: dataTodos,
  } = useQuery(GET_BOOKS, {
    fetchPolicy: "cache-only",
  });

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
            addBook({
              variables: { title: input.value, author: "Testing" },
              optimisticResponse: {
                addBook: {
                  id: "temp-id",
                  __typename: "Book",
                  title: input.value,
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
          <button type='submit'>Add book</button>
        </form>
      )}

      <h4>BOOKS</h4>
      {loadingTodos ? <p>Loading books...</p> : null}
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
