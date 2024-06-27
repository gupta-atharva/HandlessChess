const express = require('express');
const { processVoiceCommand, handleMove } = require('../controllers/gameController');
const router = express.Router();

router.post('/voice-command', processVoiceCommand);
router.post('/move', handleMove);

module.exports = router;
