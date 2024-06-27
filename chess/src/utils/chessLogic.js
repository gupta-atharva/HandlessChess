const initialBoardSetup = () => {
  return [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
  ];
};

const isOpponent = (piece, target) => {
  if (target === ' ') return false;
  return (piece === piece.toUpperCase() && target === target.toLowerCase()) || (piece === piece.toLowerCase() && target === target.toUpperCase());
};

const isValidPawnMove = (board, from, to, piece) => {
  const direction = piece === 'P' ? -1 : 1; // White pawns move up, black pawns move down
  const [fromX, fromY] = from;
  const [toX, toY] = to;
  const target = board[toX][toY];

  // Regular move
  if (fromY === toY && target === ' ' && (toX - fromX === direction || (fromX === (piece === 'P' ? 6 : 1) && toX - fromX === 2 * direction && board[fromX + direction][fromY] === ' '))) {
    return true;
  }

  // Capture move
  if (Math.abs(fromY - toY) === 1 && (toX - fromX === direction) && isOpponent(piece, target)) {
    return true;
  }

  return false;
};

const isValidKnightMove = (board, from, to, piece) => {
  const [fromX, fromY] = from;
  const [toX, toY] = to;
  const dx = Math.abs(toX - fromX);
  const dy = Math.abs(toY - fromY);
  const target = board[toX][toY];

  return ((dx === 2 && dy === 1) || (dx === 1 && dy === 2)) && (target === ' ' || isOpponent(piece, target));
};

const isValidBishopMove = (board, from, to, piece) => {
  const [fromX, fromY] = from;
  const [toX, toY] = to;
  const dx = Math.abs(toX - fromX);
  const dy = Math.abs(toY - fromY);
  const target = board[toX][toY];

  if (dx !== dy) return false;

  const xDirection = toX > fromX ? 1 : -1;
  const yDirection = toY > fromY ? 1 : -1;

  for (let i = 1; i < dx; i++) {
    if (board[fromX + i * xDirection][fromY + i * yDirection] !== ' ') {
      return false;
    }
  }
  return target === ' ' || isOpponent(piece, target);
};

const isValidRookMove = (board, from, to, piece) => {
  const [fromX, fromY] = from;
  const [toX, toY] = to;
  const target = board[toX][toY];

  if (fromX !== toX && fromY !== toY) return false;

  const xDirection = toX > fromX ? 1 : -1;
  const yDirection = toY > fromY ? 1 : -1;

  if (fromX === toX) {
    for (let i = 1; i < Math.abs(toY - fromY); i++) {
      if (board[fromX][fromY + i * yDirection] !== ' ') {
        return false;
      }
    }
  } else {
    for (let i = 1; i < Math.abs(toX - fromX); i++) {
      if (board[fromX + i * xDirection][fromY] !== ' ') {
        return false;
      }
    }
  }
  return target === ' ' || isOpponent(piece, target);
};

const isValidQueenMove = (board, from, to, piece) => {
  return isValidBishopMove(board, from, to, piece) || isValidRookMove(board, from, to, piece);
};

const isValidKingMove = (board, from, to, piece) => {
  const [fromX, fromY] = from;
  const [toX, toY] = to;
  const dx = Math.abs(toX - fromX);
  const dy = Math.abs(toY - fromY);
  const target = board[toX][toY];

  return dx <= 1 && dy <= 1 && (target === ' ' || isOpponent(piece, target));
};

const isValidMove = (board, from, to) => {
  const [fromX, fromY] = from;
  const [toX, toY] = to;
  const piece = board[fromX][fromY];
  const target = board[toX][toY];

  if (piece === ' ' || (!isOpponent(piece, target) && target !== ' ')) return false;

  switch (piece.toUpperCase()) {
    case 'P':
      return isValidPawnMove(board, from, to, piece);
    case 'N':
      return isValidKnightMove(board, from, to, piece);
    case 'B':
      return isValidBishopMove(board, from, to, piece);
    case 'R':
      return isValidRookMove(board, from, to, piece);
    case 'Q':
      return isValidQueenMove(board, from, to, piece);
    case 'K':
      return isValidKingMove(board, from, to, piece);
    default:
      return false;
  }
};

const movePiece = (board, from, to) => {
  if (!isValidMove(board, from, to)) return null;
  const newBoard = board.map(row => [...row]);
  newBoard[to[0]][to[1]] = newBoard[from[0]][from[1]];
  newBoard[from[0]][from[1]] = ' ';
  return newBoard;
};

export { initialBoardSetup, movePiece };
