import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Map from './components/Map';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [coordinates, setCoordinates] = useState({ latitude: 21.149850, longitude: 79.080598 });
  const [recognizedSpeech, setRecognizedSpeech] = useState("");

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
  } = useSpeechRecognition();

  useEffect(() => {
    setRecognizedSpeech(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="vMap">
      {/* <Navbar /> */}
      <Map coordinates={coordinates} />
      <div className="recognized-speech">
        <p>{recognizedSpeech}</p>
      </div>
      <button 
        onClick={() => SpeechRecognition.startListening()} 
        className="microphone-icon"
      >
        <FontAwesomeIcon icon={faMicrophone} size="2x" />
      </button>
    </div>
  );
}

export default App;
