import React from "react";

import { Piece } from "./piece";

import "../styles/square.css";

export function Square({
  className,
  square,
  piece,
  clickAndDropHandler,
  dragStartHandler,
}) {
  function clickHandler() {
    clickAndDropHandler(square, piece);
  }

  function dropHandler(e) {
    e.preventDefault();
    const dragPiece = e.dataTransfer.getData("piece");
    clickAndDropHandler(square, dragPiece);
  }

  function dragOverHandler(e) {
    e.preventDefault();
  }

  return (
    <div
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
      onClick={clickHandler}
      className={className}
    >
      {piece && <Piece piece={piece} handleDragStart={dragStartHandler} />}
    </div>
  );
}
