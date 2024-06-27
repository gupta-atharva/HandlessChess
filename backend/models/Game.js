const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  fen: {
    type: String,
    required: true,
  },
  history: [{
    move: String,
    timestamp: Date,
  }],
});

module.exports = mongoose.model('Game', GameSchema);
