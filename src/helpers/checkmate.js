export function inCheckmate(pieces, color) {
  let king;
  for (let piece of pieces.reduce((acc, curr) => acc.concat(curr))) {
    if (!piece || piece.color !== color) continue;

    // Find the king
    if (piece.name === "king") {
      king = piece;
    }
    if (Object.keys(piece.getPossibleMovements()).length) {
      return false;
    }
  }

  if (king.isInCheck()) {
    return true;
  }

  return false;
}
