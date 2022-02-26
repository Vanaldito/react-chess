import { useState } from "react";

export function useActivePiece() {
  const [activePiece, setActivePiece] = useState(null);
  const [activeSquares, setActiveSquares] = useState([]);

  function changeActivePiece(piece) {
    if (piece) {
      setActivePiece(piece);
      setActiveSquares(Object.keys(piece.getPossibleMovements()));
    } else {
      setActivePiece(null);
      setActiveSquares([]);
    }
  }

  return [
    activePiece,
    activeSquares,
    changeActivePiece,
  ];
}
