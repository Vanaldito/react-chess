import React from "react";

import "../styles/piece.css";

export function Piece({ piece, handleDragStart }) {
  function dragStartHandler(e) {
    e.dataTransfer.setData("piece", piece);
    handleDragStart(piece);
  }

  return (
    <img
      onDragStart={dragStartHandler}
      draggable="true"
      className="piece"
      src={piece.image}
      alt="piece"
    />
  );
}
