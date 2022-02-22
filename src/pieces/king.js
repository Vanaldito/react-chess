import { Piece } from "./piece";
import whiteKing from "../images/king_w.png";
import blackKing from "../images/king_b.png";

export class King extends Piece {
  constructor(color, initialSquare, pieces) {
    const image = color === "white" ? whiteKing : blackKing;
    super("king", color, image, initialSquare, pieces);
    this.notMoved = true; // To castle
  }

  getTheoricalMovementsWithoutCastle() {
    // No includes the castle;
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

  getTheoricalMovements() {
    const movements = this.getTheoricalMovementsWithoutCastle();
    if (this.isInCheck()) return movements;

    this._addKingsideCastle(movements);
    this._addQueensideCastle(movements);

    return movements;
  }

  _addKingsideCastle(movements) {
    if (!this.notMoved) return;

    const [x, y] = this.square;

    for (let i = 1; i < 3; i++) {
      if (this.pieces[x + i][y] !== null) return;

      this.moveTo([x + i, y]);
      if (this.isInCheck()) {
        this.moveTo([x, y]);
        return;
      }

      this.moveTo([x, y]);
    }

    const piece = this.pieces[x + 3][y]
    if (piece === null) return;
    if (piece.name !== "rook") return;
    if (!piece.notMoved) return;

    movements[[x + 2, y].toString()] = [
      [this, [x + 2, y]],
      [piece, [x + 1, y]],
    ];
  }

  _addQueensideCastle(movements) {
    if (!this.notMoved) return;

    const [x, y] = this.square;

    for (let i = 1; i < 4; i++) {
      if (this.pieces[x - i][y] !== null) return;
    }

    for (let i = 1; i < 3; i++) {
      this.moveTo([x - i, y]);
      if (this.isInCheck()) {
        this.moveTo([x, y]);
        return;
      }

      this.moveTo([x, y]);
    }

    const piece = this.pieces[x - 4][y];

    if (piece === null) return;
    if (piece.name !== "rook") return;
    if (!piece.notMoved) return;

    movements[[x - 2, y].toString()] = [
      [this, [x - 2, y]],
      [piece, [x - 1, y]],
    ];
  }

  isInCheck() {
    for (let piece of this.pieces.reduce((acc, curr) => acc.concat(curr))) {
      if (piece === null) continue;
      if (piece.color === this.color) continue;
      
      const movements = piece.name === "king" ? 
        piece.getTheoricalMovementsWithoutCastle() : 
        piece.getTheoricalMovements();

      if (this.square.toString() in movements) {
        return true;
      }
    }
    return false;
  }
}
