import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceCommand = ({ onCommand }) => {
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (finalTranscript !== '') {
      console.log('Final transcript:', finalTranscript);
      onCommand(finalTranscript);
      resetTranscript();
    }
  }, [finalTranscript, onCommand, resetTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return <div>Your browser does not support speech recognition software!</div>;
  }

  const handleListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  return (
    <div>
      <button onClick={handleListening}>Start Voice Command</button>
      <p>Listening: {listening ? 'Yes' : 'No'}</p>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default VoiceCommand;
