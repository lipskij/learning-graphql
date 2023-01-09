import { useState } from "react";
import Characters from "./components/characters";
import LazyLoaded from "./components/lazyLoaded";
import Photos from "./components/photos";
import PreviousData from "./components/previousData";

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
  const [selectedCharID, setSelectedCharID] = useState("");

  const onCharacterSelect = (e) => {
    setSelectedCharID(e.target.value);
  };

  return (
    <div>
      <LazyLoaded />
      <Characters onCharacterSelect={onCharacterSelect} />
      <Photos id={selectedCharID} />
      <PreviousData id={selectedCharID} />
    </div>
  );
}
