import React, { createRef } from "react";

import { Board } from "./components/board";
import movementSound from "./sounds/movements_sound.wav";

import "./styles/app.css";

export function App() {
  const soundRef = createRef();
  return (
    <div>
      <Board squareSize={70} movementSound={soundRef}/>
      <audio src={movementSound} ref={soundRef} />
    </div>
  );
}
