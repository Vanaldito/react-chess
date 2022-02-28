import React, { useState } from "react";

import { Board } from "./components/board";

import { createInitialPosition } from "./helpers/initial_position";
import { useActivePiece } from "./hooks/useActivePiece";
import { inCheckmate } from "./helpers/checkmate";
import { stalemate } from "./helpers/stalemate";

import movementsSound from "./sounds/movements_sound.wav";

import "./styles/app.css";

export function App() {
  const [gameActive, setGameActive] = useState(true);
  const [pieces, setPieces] = useState(createInitialPosition());
  const [whiteMove, setWhiteMove] = useState(true);
  const [activePiece, activeSquares, changeActivePiece] = useActivePiece();
  const [movementsWithoutCaptures, setMovementsWithoutCaptures] = useState(0);

  function clickAndDropHandler(square, piece) {
    if (!gameActive) return;
    if (activePiece) {
      const squareKey = square.toString();

      if (activeSquares.includes(squareKey)) {
        return moveActivePiece(squareKey);
      }
      if (piece && piece.square === activePiece.square) {
        return changeActivePiece(null);
      }
    }
    if (piece && canBeActivePiece(piece)) {
      return changeActivePiece(piece); 
    }

    changeActivePiece(null);
  }

  function dragStartHandler(piece) {
    if (!gameActive) return;
    if (canBeActivePiece(piece)) {
      changeActivePiece(piece);
    }
  }

  function canBeActivePiece(piece) {
    const turn = whiteMove ? "white" : "black";
    if (piece.color === turn) {
      return true;
    }
    return false;
  }

  function moveActivePiece(squareKey) {
    new Audio(movementsSound).play();

    const possibleMovements = activePiece.getPossibleMovements();
    setPieces(activePiece.move(
      possibleMovements[squareKey],
      movementsWithoutCaptures,
      setMovementsWithoutCaptures,
    ));

    setWhiteMove(!whiteMove);
    changeActivePiece(null);
  }

  function reset() {
    setGameActive(true);
    setPieces(createInitialPosition());
    setWhiteMove(true);
    changeActivePiece(null);
    setMovementsWithoutCaptures(0);
  }

  function getInfo() {
    const turn = whiteMove ? "white" : "black";
    if (inCheckmate(pieces, turn)) {
      if (gameActive) setGameActive(false);
      return `${whiteMove ? "BLACK" : "WHITE"} WIN!!`;
    }

    if (stalemate(pieces, turn)) {
      if (gameActive) setGameActive(false);
      return "Stalemate";
    }

    if (movementsWithoutCaptures === 100) {
      if (gameActive) setGameActive(false);
      return "Draws for 50 movements rule";
    }

    return `${turn[0].toUpperCase() + turn.slice(1)} move`;
  }

  const info = getInfo();

  return (
    <div>
      <Board 
        squareSize={70} 
        activeSquares={activeSquares}
        pieces={pieces}
        setPieces={setPieces}
        clickAndDropHandler={clickAndDropHandler}
        dragStartHandler={dragStartHandler}
      />
      <p className="game-state">{info}</p>
      <button 
        onClick={reset} 
        className="reset"
      >
        {gameActive ? "Reset" : "Play again"}
      </button>
    </div>
  );
}
