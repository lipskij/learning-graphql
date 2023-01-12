import { useMutation, useQuery, gql } from "@apollo/client";
import { ADD_BOOK, GET_BOOKS } from "../queries/addBook";

// page that refeches query DONE

// page that modifies cache DONE

// optimistic UI DONE

const AddTodo = () => {
  let input;

  const [addBook, { loading, error }] = useMutation(ADD_BOOK);

  if (error) return `Submission error! ${error.message}`;

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

      <BookList />
    </div>
  );
};

export default AddTodo;

const BookList = () => {
  const { loading, error, data } = useQuery(GET_BOOKS, {
    fetchPolicy: "cache-and-network",
  });

  if (error) return `Todos error: ${error.message}`;

  return (
    <div>
      <h4>BOOKS</h4>
      {loading ? <p>Loading books...</p> : null}
      <ul
        style={{
          padding: 0,
        }}
      >
        {data?.books
          ? data?.books.map((i, index) => (
              <li
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
                key={i.title + index}
              >
                <span> Author: {i.author}</span>
                Title: {i.title}
                <hr />
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};
