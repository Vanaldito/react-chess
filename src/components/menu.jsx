import React, { createRef, useEffect } from "react";

import { Queen } from "../pieces/queen";
import { Rook } from "../pieces/rook";
import { Knight } from "../pieces/knight";
import { Bishop } from "../pieces/bishop";

import whiteQueen from "../images/queen_w.png"
import blackQueen from "../images/queen_b.png"
import whiteBishop from "../images/bishop_w.png"
import blackBishop from "../images/bishop_b.png"
import whiteRook from "../images/rook_w.png"
import blackRook from "../images/rook_b.png"
import whiteKnight from "../images/knight_w.png"
import blackKnight from "../images/knight_b.png"

import "../styles/menu.css";

export function PromotionMenu({ promotionPawn, pieces, setPieces }) {
  function getImages() {
    if (promotionPawn.color === "white") {
      return {
        queen: whiteQueen,
        rook: whiteRook,
        bishop: whiteBishop,
        knight: whiteKnight,
      };
    }

    return {
      queen: blackQueen,
      rook: blackRook,
      bishop: blackBishop,
      knight: blackKnight,
    };
  }

  const menuRef = createRef();
  const images = getImages();

  useEffect(() => {
    function withoutMovement(e) {
      const menu = menuRef.current;
      if (!menu || !menu.contains(e.target)) e.stopPropagation();
    }

    window.addEventListener("click", withoutMovement, true)
    window.addEventListener("dragstart", withoutMovement, true);

    return () => {
      window.removeEventListener("click", withoutMovement, true);
      window.removeEventListener("dragstart", withoutMovement, true);
    }
  }, [])

  function selectPiece(piece) {
    return () => {
      const [x, y] = promotionPawn.square;
      switch(piece) {
        case "queen":
          pieces[x][y] = new Queen(promotionPawn.color, [x, y], pieces);
          break;
        case "knight":
          pieces[x][y] = new Knight(promotionPawn.color, [x, y], pieces);
          break;
        case "bishop":
          pieces[x][y] = new Bishop(promotionPawn.color, [x, y], pieces);
          break;
        case "rook":
          pieces[x][y] = new Rook(promotionPawn.color, [x, y], pieces);
          break;
        default:
          break;
      }
      setPieces(pieces);
    }
  }

  return (
    <div ref={menuRef} className="promotion-menu">
      <ul>
        {
          Object.keys(images).map(piece => (
            <li key={piece}>
              <img 
                onClick={selectPiece(piece)}
                src={images[piece]} 
                alt="choice" 
              />
            </li>
          ))
        }
      </ul>
    </div>
  );
}
