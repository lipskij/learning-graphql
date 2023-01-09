import { useState } from "react";
import Characters from "./components/characters";
import Photos from "./components/photos";

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
      <Characters onCharacterSelect={onCharacterSelect} />
      <Photos id={selectedCharID} />
    </div>
  );
}
