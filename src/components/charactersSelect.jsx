import { useQuery } from "@apollo/client";

import GET_MORTYS from "../queries/getNames";

const CharactersSelect = ({ onCharacterSelect }) => {
  const { loading, error, data } = useQuery(GET_MORTYS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <h3>Characters</h3>
      <select name='character' onChange={(e) => onCharacterSelect(e)}>
        {data.characters.results.map((i) => (
          <option key={i.id} value={i.id}>
            {i.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default CharactersSelect;
