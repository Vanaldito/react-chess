import { Piece } from "./piece";
import whitePawn from "../images/pawn_w.png";
import blackPawn from "../images/pawn_b.png";

export class Pawn extends Piece {
  constructor(color, initialSquare, pieces) {
    const image = color === "white" ? whitePawn : blackPawn;
    super("pawn", color, image, initialSquare, pieces);
    this.notMoved = true; // To move two squares
    this.enPassant = false;
  }

  getTheoricalMovements() {
    const movements = {};
    const [x, y] = this.square;

    const yDirection = this.color === "white" ? -1 : 1;

    for (let xDirection of [-1, 1]) {
      // Diagonal Capture
      this._addDiagonalCapture(
        [x + xDirection, y + yDirection],
        movements
      );

      // En Passant Capture
      this._addEnPassantCapture(
        [x + xDirection, y],
        yDirection,
        movements
      );
    }

    if (this.pieces[x][y + yDirection] !== null) {
      return movements;
    }

    // Forward Pawn Move
    movements[[x, y + yDirection].toString()] = [
      [this, [x, y + yDirection]],
    ];

    if (this.notMoved && this.pieces[x][y + 2 * yDirection] === null) {
      movements[[x, y + 2 * yDirection].toString()] = [
        [this, [x, y + 2 * yDirection]],
      ];
    }

    return movements;
  }

  _addDiagonalCapture(square, movements) {
    const [x, y] = square;

    if (x < 0 || x > 7 || y < 0 || y > 7) return;

    const diagonalPiece = this.pieces[x][y];

    if (diagonalPiece !== null && diagonalPiece.color !== this.color) {
      movements[square.toString()] = [[this, square]];
    }   
  }

  _addEnPassantCapture(square, yDirection, movements) {
    const [x, y] = square;

    if (x < 0 || x > 7 || y < 0 || y > 7) return;

    const enPassantPiece = this.pieces[x][y];

    if (enPassantPiece === null) return;
    if (enPassantPiece.color === this.color) return;
    if (enPassantPiece.name !== "pawn") return;
    if (!enPassantPiece.enPassant) return;

    movements[[x, y + yDirection].toString()] = [
      [enPassantPiece, [x, y + yDirection]],
      [this, [x, y + yDirection]],
    ];
  }

  move(movements) {
    const initialYSquare = this.square[1];
    const newPieces = super.move(movements);

    if (Math.abs(initialYSquare - this.square[1]) === 2) {
      this.enPassant = true;
    }

    return newPieces;
  }
}
