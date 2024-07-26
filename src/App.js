import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Map from './components/Map';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import VoiceVisualizer from './components/VoiceVisualizer'; // Import the visualizer
import Sidebar from './components/Sidebar';

function App() {
  const [coordinates, setCoordinates] = useState({ latitude: 21.149850, longitude: 79.080598 });
  const [recognizedSpeech, setRecognizedSpeech] = useState("");
  const [dispText, setDispText] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error obtaining location", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({ continuous: true });

  useEffect(() => {
    if (transcript && transcript !== recognizedSpeech) {
      setRecognizedSpeech(transcript);
      setDispText(true);
    }
  }, [transcript, recognizedSpeech]);

  const handleStartListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
    setDispText(true);
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    if (!transcript.trim()) {
      setDispText(false);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="vMap">
      {/* <Navbar /> */}
      <Map coordinates={coordinates} />
      <Sidebar />
      <div className={dispText ? "recognized-speech" : "recognized-speech hideTextBox"}>
        <VoiceVisualizer listening={listening} /> {/* Add visualizer here */}
        <p>{recognizedSpeech}</p>
      </div>
      <button 
        onMouseDown={handleStartListening}
        onMouseUp={handleStopListening}
        onMouseLeave={handleStopListening}
        onTouchStart={handleStartListening}
        onTouchEnd={handleStopListening}
        className="microphone-icon"
      >
        <FontAwesomeIcon icon={faMicrophone} size="2x" />
      </button>
    </div>
  );
}

export default App;
