import { Piece } from "./piece";
import whiteKing from "../images/king_w.png";
import blackKing from "../images/king_b.png";

export class King extends Piece {
  constructor(color, initialSquare, pieces) {
    const image = color === "white" ? whiteKing : blackKing;
    super("king", color, image, initialSquare, pieces);
    this.notMoved = true; // To castle
  }

  getTheoricalMovements() {
    const directions = [
      [0, 1],
      [1, 0], 
      [0, -1],
      [-1, 0],
      [1, 1],
      [-1, 1],
      [1, -1],
      [-1, -1]
    ];

    const movements = {};

    for (let direction of directions) {
      const x = this.square[0] + direction[0];
      const y = this.square[1] + direction[1];

      if (x < 0 || x > 7 || y < 0 || y > 7) continue;
      if (this.pieces[x][y] !== null && this.pieces[x][y].color === this.color) continue;

      movements[[x, y].toString()] =  [[this, [x, y]]];
    }

    return movements;
  }

  isInCheck() {
    for (let piece of this.pieces.reduce((acc, curr) => acc.concat(curr))) {
      if (piece === null) continue;
      if (piece.color === this.color) continue;
      
      const movements = piece.getTheoricalMovements();
      if (this.square.toString() in movements) {
        return true;
      }
    }
    return false;
  }
}
