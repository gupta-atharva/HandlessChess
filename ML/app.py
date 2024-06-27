from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
import json
import numpy as np

# Load model and tokenizers
model = tf.keras.models.load_model('chess_model.h5')

with open('tokenizer.json') as f:
    tokenizer = tf.keras.preprocessing.text.tokenizer_from_json(f.read())

with open('piece_tokenizer.json') as f:
    piece_tokenizer = tf.keras.preprocessing.text.tokenizer_from_json(f.read())

with open('position_tokenizer.json') as f:
    position_tokenizer = tf.keras.preprocessing.text.tokenizer_from_json(f.read())

# Ensure max_length is the same as used during training
max_length = 6  # Change this to the correct value used during training

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    text = request.json.get('text')
    if not text:
        return jsonify({"error": "No text provided"}), 400

    sequence = tokenizer.texts_to_sequences([text])
    padded_sequence = pad_sequences(sequence, maxlen=max_length, padding='post')

    predictions = model.predict(padded_sequence)
    piece_pred = np.argmax(predictions[0], axis=-1)
    from_pred = np.argmax(predictions[1], axis=-1)
    to_pred = np.argmax(predictions[2], axis=-1)

    piece = piece_tokenizer.index_word[piece_pred[0]]
    from_pos = position_tokenizer.index_word[from_pred[0]]
    to_pos = position_tokenizer.index_word[to_pred[0]]

    return jsonify({"move": {"from": from_pos, "to": to_pos}})

if __name__ == '__main__':
    app.run(port=8000)
