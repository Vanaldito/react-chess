import { King } from "../pieces/king";
import { Queen } from "../pieces/queen";
import { Bishop } from "../pieces/bishop";
import { Knight } from "../pieces/knight";
import { Rook } from "../pieces/rook";
import { Pawn } from "../pieces/pawn";

export function createInitialPosition() {
  function arrayOfLengthEight() {
    return Array(8).fill(null)
  }

  // Create a 8x8 matrix
  const array = arrayOfLengthEight().map(arrayOfLengthEight);

  array[0][0] = new Rook("black", [0, 0], array);
  array[7][0] = new Rook("black", [7, 0], array);
  array[1][0] = new Knight("black", [1, 0], array);
  array[6][0] = new Knight("black", [6, 0], array);
  array[2][0] = new Bishop("black", [2, 0], array);
  array[5][0] = new Bishop("black", [5, 0], array);
  array[3][0] = new Queen("black", [3, 0], array);
  array[4][0] = new King("black", [4, 0], array);
  for (let i = 0; i < 8; i++) {
    array[i][1] = new Pawn("black", [i, 1], array)
  }

  array[0][7] = new Rook("white", [0, 7], array);
  array[7][7] = new Rook("white", [7, 7], array);
  array[1][7] = new Knight("white", [1, 7], array);
  array[6][7] = new Knight("white", [6, 7], array);
  array[2][7] = new Bishop("white", [2, 7], array);
  array[5][7] = new Bishop("white", [5, 7], array);
  array[3][7] = new Queen("white", [3, 7], array);
  array[4][7] = new King("white", [4, 7], array);
  for (let i = 0; i < 8; i++) {
    array[i][6] = new Pawn("white", [i, 6], array)
  }

  return array;
}
