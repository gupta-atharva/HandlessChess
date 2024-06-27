import React from 'react';
import Chessboard from 'chessboardjsx';

const ChessboardComponent = ({ position, onDrop }) => {
  return (
    <Chessboard position={position} onDrop={onDrop} />
  );
};

export default ChessboardComponent;
