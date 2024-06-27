const OpenAI = require('openai-api');
const openai = new OpenAI(process.env.OPENAI_API_KEY);
const { Chess } = require('chess.js');

const processVoiceCommand = async (req, res) => {
  console.log("HEHE");
  const { command } = req.body;
  const gptResponse = await openai.complete({
    engine: 'davinci-codex',
    prompt: `Convert the following voice command to a chess move: "${command}"`,
    maxTokens: 5,
  });
  const move = gptResponse.data.choices[0].text.trim();
  res.json({ move });
  console.log(openai);
};

const handleMove = (req, res) => {
  console.log("blimey")
  const { move } = req.body;
  const game = new Chess();
  const result = game.move(move);
  res.json({ game: game.fen(), result });
};

module.exports = {
  processVoiceCommand,
  handleMove,
};
