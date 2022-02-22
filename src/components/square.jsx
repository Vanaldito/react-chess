import React from "react";

import { Piece } from "./piece";

export function Square({ className, style, piece, setPieces }) {
  return (
    <div 
      className={className}
      style={style}
    >
      {
        piece && <Piece piece={piece} setPieces={setPieces} />
      }
    </div>
  );
}
