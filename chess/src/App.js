import React, { useState } from 'react';
import axios from 'axios';
import ChessboardComponent from './components/Chessboard';
import VoiceCommand from './components/VoiceCommand';
import { initialBoardSetup, movePiece } from './utils/chessLogic';
import './index.css';

const App = () => {
  const [game, setGame] = useState({
    board: initialBoardSetup(),
    turn: 'w' // 'w' for white's turn, 'b' for black's turn
  });

  const handleMove = (from, to) => {
    const newBoard = movePiece(game.board, from, to);
    console.log(from, "he", to);
    if (newBoard) {
      setGame({
        board: newBoard,
        turn: game.turn === 'w' ? 'b' : 'w'
      });
    }
  };

  const handleVoiceCommand = async (text) => {
    try {
      console.log(text);
      const response = await axios.post(`http://localhost:8000/predict`, { text });
      const { from, to } = response.data;
      const piece = game.board[from[0]][from[1]];
      const pieceColor = piece === piece.toUpperCase() ? 'w' : 'b';
      if (pieceColor === game.turn) {
        handleMove(from, to);
      } else {
        console.log('It is not your turn');
      }
    } catch (error) {
      console.error('Error processing voice command:', error);
    }
  };

  return (
    <div>
      <ChessboardComponent 
        board={game.board} 
        onDrop={(event, targetSquare) => {
          const sourceSquare = event.dataTransfer.getData('sourceSquare').split(',').map(Number);
          handleMove(sourceSquare, targetSquare);
        }} 
      />
      <VoiceCommand onCommand={handleVoiceCommand} />
    </div>
  );
};

export default App;
