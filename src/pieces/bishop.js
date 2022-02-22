import { Piece } from "./piece";
import whiteBishop from "../images/bishop_w.png";
import blackBishop from "../images/bishop_b.png";

export class Bishop extends Piece {
  constructor(color, initialSquare, pieces) {
    const image = color === "white" ? whiteBishop : blackBishop;
    super("bishop", color, image, initialSquare, pieces);
  }

  getTheoricalMovements() {
    const directions = [
      [1, 1],
      [-1, 1],
      [1, -1],
      [-1, -1]
    ];

    const movements = {};

    for (let direction of directions) {
      let x = this.square[0] + direction[0];
      let y = this.square[1] + direction[1];

      while (true) {
        if (x < 0 || x > 7 || y < 0 || y > 7) break;
        if (this.pieces[x][y] !== null && this.pieces[x][y].color === this.color) break;

        movements[[x, y].toString()] =  [[this, [x, y]]];

        x += direction[0];
        y += direction[1];
      }
    }

    return movements;
  }
}
