import React, { useState } from 'react';
import axios from 'axios';
import { Chess } from 'chess.js';
import ChessboardComponent from './components/Chessboard';
import VoiceCommand from './components/VoiceCommand';

const App = () => {
  const [game, setGame] = useState(new Chess());

  const handleMove = async (move) => {
    const gameCopy = new Chess(game.fen());
    const result = gameCopy.move(move);
    if (result) setGame(gameCopy);
  };

  const handleVoiceCommand = async (text) => {
    try {
      console.log(text);
      const response = await axios.post(`http://localhost:8000/predict`, { text });
      handleMove(response.data.move);
    } catch (error) {
      console.error('Error processing voice command:', error);
    }
  };

  return (
    <div>
      <ChessboardComponent position={game.fen()} onDrop={({ sourceSquare, targetSquare }) => handleMove({ from: sourceSquare, to: targetSquare })} />
      <VoiceCommand onCommand={handleVoiceCommand} />
    </div>
  );
};

export default App;
