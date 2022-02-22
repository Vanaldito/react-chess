import React from "react";

import "../styles/piece.css";

export function Piece({ piece, setPieces }) {
  function clickHandler() {
    const theoricalMovements = piece.getPossibleMovements();
    const movements = Object.values(theoricalMovements);
    const movement = movements[0];
    for (let tuple of movement) {
      const [piece, square] = tuple;
      setPieces(piece.moveTo(square));
    }
  }

  return (
    <img 
      onClick={clickHandler}
      className="piece" 
      src={piece.image}
      alt="piece" 
    />
  );
}
