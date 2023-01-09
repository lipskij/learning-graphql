// Import everything needed to use the `useQuery` hook
import { useQuery } from "@apollo/client";
import GET_MORTYS from "./queries/getLocations";

export default function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <br />
      <DisplayMortys />
    </div>
  );
}

function DisplayMortys() {
  const { loading, error, data } = useQuery(GET_MORTYS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <h3>Characters</h3>
      {data.characters.results.map((i, index) => (
        <div key={i.name + index}>
          <p>{i.name}</p>
        </div>
      ))}
    </div>
  );
}
