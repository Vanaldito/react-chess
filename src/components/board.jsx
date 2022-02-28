import React from "react";

import { Square } from "./square";
import { PromotionMenu } from "./menu";

import "../styles/board.css";

export function Board({ 
  squareSize,
  activeSquares,
  pieces,
  setPieces,
  clickAndDropHandler,
  dragStartHandler,
}) {
  const boardArray = [];

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

  const promotionPawn = pieces
    .reduce((acc, curr) => acc.concat(curr))
    .find(piece => {
      if (!piece || piece.name !== "pawn") return false;
      const endRow = piece.color === "white" ? 0 : 7; 
      if (piece.square[1] === endRow) return true;
      return false;
    });

  return (
    <>
      <div 
        className="board"
        style={boardStyle}
      >
        {boardArray}
        { 
          promotionPawn && <PromotionMenu 
            promotionPawn={promotionPawn}
            pieces={[...pieces]}
            setPieces={setPieces}
          />
        }
      </div>
    </>
  );
}
