import React, { useState } from "react";

import { Square } from "./square";
import { createInitialPosition } from "../helpers/initial_position";

import "../styles/board.css";

export function Board({ squareSize }) {
  let boardArray = [];

  const [pieces, setPieces] = useState(createInitialPosition());

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const squareStyle = {
        width: squareSize + "px",
        height: squareSize + "px",
      }

      const color = (j - i) % 2 ? "black" : "white";
      const key = j.toString() + i.toString()
      const piece = pieces[j][i];

      boardArray.push(
        <Square 
          key={key}
          className={`square ${color}-square`}
          style={squareStyle}
          piece={piece}
          setPieces={setPieces}
        />
      );
    }
  }

  const boardStyle = {
    width: 8 * squareSize + "px",
    height: 8 * squareSize + "px",
  }

  return (
    <div 
      className="board"
      style={boardStyle}
    >
      {boardArray}
    </div>
  )
}
