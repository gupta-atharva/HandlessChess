import React from 'react';
// import './Chessboard.css';

const ChessboardComponent = ({ board, onDrop }) => {
  const renderSquare = (x, y) => {
    const piece = board[x][y];
    return (
      <div 
        className="square" 
        key={`${x}-${y}`}
        onDrop={(event) => {
          event.preventDefault();
          onDrop(event, [x, y]);
        }}
        onDragOver={(event) => event.preventDefault()}
      >
        {piece !== ' ' && (
          <div 
            className="piece" 
            draggable 
            onDragStart={(event) => event.dataTransfer.setData('sourceSquare', `${x},${y}`)}
          >
            {piece}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="chessboard">
      {board.map((row, x) => row.map((_, y) => renderSquare(x, y)))}
    </div>
  );
};

export default ChessboardComponent;