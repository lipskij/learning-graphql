import { useState } from "react";
import CharactersSelect from "./charactersSelect";
import Photos from "./photos";
import PreviousData from "./previousData";

const DisplayMortys = () => {
  const [selectedCharID, setSelectedCharID] = useState("");

  const onCharacterSelect = (e) => {
    setSelectedCharID(e.target.value);
  };

  return (
    <div>
      <CharactersSelect onCharacterSelect={onCharacterSelect} />
      <Photos id={selectedCharID} />
      <PreviousData id={selectedCharID} />
    </div>
  );
};

export default DisplayMortys;
