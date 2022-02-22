export class Piece {
  constructor(name, color, image, initialSquare, pieces) {
    this.name = name;
    this.color = color;
    this.image = image;
    this.square = initialSquare;
    this.pieces = pieces;
  }  

  moveTo(square) {
    this.pieces[this.square[0]][this.square[1]] = null;
    this.pieces[square[0]][square[1]] = this;
    this.square = square;

    return [...this.pieces];
  }

  getTheoricalMovements() {}

  getPossibleMovements() {
    const theoricalMovements = this.getTheoricalMovements();
    const possibleMovements = {};

    const king = this.findKing();

    for (let [key, movements] of Object.entries(theoricalMovements)) {
      const initialSquares = [];
      const currentPieces = [];

      for (let [piece, square] of movements) {
        initialSquares.push([piece, piece.square]);
        currentPieces.push([this.pieces[square[0]][square[1]], square]);
        piece.moveTo(square);
      }

      if (!king.isInCheck()) {
        possibleMovements[key] = movements;
      }

      while (initialSquares.length) {
        const [piece, initialSquare] = initialSquares.pop();
        piece.moveTo(initialSquare);

        const [currentPiece, square] = currentPieces.pop();
        this.pieces[square[0]][square[1]] = currentPiece;
      }
    }

    return possibleMovements;
  }

  findKing() {
    for (let piece of this.pieces.reduce((acc, curr) => acc.concat(curr))) {
      if (piece === null) continue;
      if (piece.name === "king" && piece.color === this.color) {
        return piece;
      }
    }
    return null;
  }
}
