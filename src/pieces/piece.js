export class Piece {
  constructor(name, color, image, initialSquare, pieces) {
    this.name = name;
    this.color = color;
    this.image = image;
    this.square = initialSquare;
    this.pieces = pieces;
    this.notMoved = true;
  }

  move(movements, movementsWithoutCaptures, setMovementsWithoutCaptures) {
    let resetMovementsWithoutCaptures = false;
    for (let [piece, square] of movements) {
      if (piece.name === "pawn" || this.pieces[square[0]][square[1]] !== null) {
        resetMovementsWithoutCaptures = true;
      }
      piece.moveTo(square);
      piece.notMoved = false;
    }

    if (resetMovementsWithoutCaptures) {
      setMovementsWithoutCaptures(0);
    } else {
      setMovementsWithoutCaptures(movementsWithoutCaptures + 1);
    }

    // En passant capture can only be done on the next move
    for (let piece of this.pieces.reduce((acc, curr) => acc.concat(curr))) {
      if (piece && piece.name === "pawn" && piece.color !== this.color) {
        piece.enPassant = false;
      }
    }

    return [...this.pieces];
  }

  moveTo(square) {
    this.pieces[this.square[0]][this.square[1]] = null;
    this.pieces[square[0]][square[1]] = this;
    this.square = square;
  }

  getTheoricalMovements() {}

  getPossibleMovements() {
    const theoricalMovements = this.getTheoricalMovements();
    const possibleMovements = {};

    const king = this._findKing(this.color);

    for (let [key, movements] of Object.entries(theoricalMovements)) {
      const initialSquares = [];
      const initialPieces = []; // For the delete pieces

      for (let [piece, square] of movements) {
        initialSquares.push([piece, piece.square]);
        initialPieces.push([this.pieces[square[0]][square[1]], square]);
        piece.moveTo(square);
      }

      if (!king.isInCheck()) {
        possibleMovements[key] = movements;
      }

      // Return to the initial position
      while (initialSquares.length) {
        const [piece, initialSquare] = initialSquares.pop();
        piece.moveTo(initialSquare);

        const [initialPiece, square] = initialPieces.pop();
        this.pieces[square[0]][square[1]] = initialPiece;
      }
    }

    return possibleMovements;
  }

  _findKing(color) {
    for (let piece of this.pieces.reduce((acc, curr) => acc.concat(curr))) {
      if (piece === null) continue;
      if (piece.name === "king" && piece.color === color) {
        return piece;
      }
    }
    return null;
  }
}
