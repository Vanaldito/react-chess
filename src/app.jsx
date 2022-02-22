import React from "react";

import { Board } from "./components/board";

import "./styles/app.css";

export function App() {
  return (
    <div>
      <Board squareSize={70} />
    </div>
  );
}
