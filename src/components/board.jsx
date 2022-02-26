import React, { useState } from "react";

import { Square } from "./square";
import { useActivePiece } from "../hooks/useActivePiece";
import { createInitialPosition } from "../helpers/initial_position";
import { inCheckmate } from "../helpers/checkmate";
import { stalemate } from "../helpers/stalemate";

import "../styles/board.css";

export function Board({ squareSize, movementSound }) {
  let boardArray = [];

  const [pieces, setPieces] = useState(createInitialPosition());
  const [whiteMove, setWhiteMove] = useState(true);
  const [gameActive, setGameActive] = useState(true);
  const [activePiece, activeSquares, changeActivePiece] = useActivePiece();

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
    movementSound.current.play();
    setPieces(activePiece.move(activePiece.getPossibleMovements()[squareKey]));
    setWhiteMove(!whiteMove);
    changeActivePiece(null);
  }

  function getInfo() {
    const turn = whiteMove ? "white" : "black";
    if (inCheckmate(pieces, turn)) {
      if (gameActive) setGameActive(false);
      return `${whiteMove ? "Black" : "White"} win`;
    }

    if (stalemate(pieces, turn)) {
      if (gameActive) setGameActive(false);
      return "Stalemate";
    }

    return `${turn[0].toUpperCase() + turn.slice(1)} move`;
  }

  const info = getInfo();

  // Create the board
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const color = (j - i) % 2 ? "black" : "white";
      const key = j.toString() + i.toString()
      const piece = pieces[j][i];

      const active = activeSquares.includes([j, i].toString());

      boardArray.push(
        <Square 
          key={key}
          className={`square ${color}-square${active ? " active" : ""}`}
          square={[j, i]}
          piece={piece}
          clickAndDropHandler={clickAndDropHandler}
          dragStartHandler={dragStartHandler}
        />
      );
    }
  }

  const boardStyle = {
    width: 8 * squareSize + "px",
    aspectRatio: "1 / 1",
    maxWidth: "90vw"
  };

  return (
    <>
      <div 
        className="board"
        style={boardStyle}
      >
        {boardArray}
      </div>
      <p className="game-state">{info}</p>
    </>
  );
}
