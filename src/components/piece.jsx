import React from "react";

import "../styles/piece.css";

export function Piece({ piece, setPieces }) {
  function clickHandler() {
    const possibleMovements = piece.getPossibleMovements();
    console.log(Object.keys(possibleMovements));
    const movements = Object.values(possibleMovements);
    const movement = movements[movements.length - 1];
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
