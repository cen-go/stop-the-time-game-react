import { useState, useRef } from "react";

export default function Player() {
  const nameInput = useRef();
  const [playerName, setPlayerName] = useState("");

  const handleClick = () => setPlayerName(nameInput.current.value);

  return (
    <section id="player">
      <h2>Welcome {playerName || "new player"}</h2>
      <p>
        <input type="text" ref={nameInput} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
