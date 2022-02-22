import { Piece } from "./piece";
import whiteRook from "../images/rook_w.png";
import blackRook from "../images/rook_b.png";

export class Rook extends Piece {
  constructor(color, initialSquare, pieces) {
    const image = color === "white" ? whiteRook : blackRook;
    super("rook", color, image, initialSquare, pieces);
    this.notMoved = true; // To castle
  }

  getTheoricalMovements() {
    const directions = [
      [0, 1],
      [1, 0], 
      [0, -1],
      [-1, 0],
    ];

    const movements = {};

    for (let direction of directions) {
      let x = this.square[0] + direction[0];
      let y = this.square[1] + direction[1];

      while (true) {
        if (x < 0 || x > 7 || y < 0 || y > 7) break;
        if (this.pieces[x][y] !== null) {
          if (this.pieces[x][y].color !== this.color) {
            movements[[x, y].toString()] =  [[this, [x, y]]];
          }
          break;
        }

        movements[[x, y].toString()] =  [[this, [x, y]]];

        x += direction[0];
        y += direction[1];
      }
    }

    return movements;
  }
}
