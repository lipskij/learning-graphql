import { useState } from "react";
import CharactersSelect from "./CharacterSelect";
import Photos from "./Photos";
import PreviousData from "./PreviousData";

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
