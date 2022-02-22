import { Piece } from "./piece";
import whiteKnight from "../images/knight_w.png";
import blackKnight from "../images/knight_b.png";

export class Knight extends Piece {
  constructor(color, initialSquare, pieces) {
    const image = color === "white" ? whiteKnight : blackKnight;
    super("knight", color, image, initialSquare, pieces);
  }

  getTheoricalMovements(pieces) {
    const directions = [
      [1, -2], 
      [2, -1],
      [2, 1],
      [1, 2],
      [-1, 2],
      [-2, 1],
      [-2, -1],
      [-1, -2],
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
}
