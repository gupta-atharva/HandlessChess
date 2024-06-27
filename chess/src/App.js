import React, { useState } from 'react';
import axios from 'axios';
import ChessboardComponent from './components/Chessboard';
import VoiceCommand from '../src/components/VoiceCommand';
import { initialBoardSetup, movePiece } from './utils/chessLogic';
import './index.css';

const App = () => {
  const [board, setBoard] = useState(initialBoardSetup());

  const handleMove = (from, to) => {
    const newBoard = movePiece(board, from, to);
    if (newBoard) setBoard(newBoard);
  };

  const handleVoiceCommand = async (text) => {
    try {
      console.log(text);
      const response = await axios.post(`http://localhost:8000/predict`, { text });
      const { from, to } = response.data;
      handleMove(from, to);
    } catch (error) {
      console.error('Error processing voice command:', error);
    }
  };

  return (
    <div>
      <ChessboardComponent 
        board={board} 
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
