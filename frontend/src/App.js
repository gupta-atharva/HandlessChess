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

  const handleVoiceCommand = async (command) => {
    try {
      console.log(command);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/voice-command/`, { command });
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
