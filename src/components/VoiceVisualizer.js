import React, { useRef, useEffect } from 'react';

const VoiceVisualizer = ({ listening }) => {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const sourceRef = useRef(null);

  useEffect(() => {
    if (listening) {
      startVisualizer();
    } else {
      stopVisualizer();
    }
  }, [listening]);

  const startVisualizer = () => {
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioContextRef.current = audioContext;
    const analyser = audioContext.createAnalyser();
    analyserRef.current = analyser;
    analyser.fftSize = 256; // Size for frequency data
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    dataArrayRef.current = dataArray;

    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const source = audioContext.createMediaStreamSource(stream);
      sourceRef.current = source;
      source.connect(analyser);
      draw(canvasCtx, canvas.width, canvas.height);
    });
  };

  const draw = (canvasCtx, width, height) => {
    requestAnimationFrame(() => draw(canvasCtx, width, height));
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    if (analyser) {
      analyser.getByteFrequencyData(dataArray);

      canvasCtx.clearRect(0, 0, width, height); // Clear the canvas

      const barWidth = width / dataArray.length;
      const barSpacing = barWidth * 0.1; // Space between bars
      const barWidthActual = barWidth - barSpacing;

      for (let i = 0; i < dataArray.length; i++) {
        const barHeight = (dataArray[i] / 256) * (height / 2); // Half the height for bidirectional bars

        canvasCtx.fillStyle = `hsl(${(i / dataArray.length) * 360}, 100%, 50%)`; // Color gradient

        // Draw bar extending upwards
        canvasCtx.fillRect(i * barWidth + barSpacing / 2, height / 2 - barHeight, barWidthActual, barHeight);

        // Draw bar extending downwards
        canvasCtx.fillRect(i * barWidth + barSpacing / 2, height / 2, barWidthActual, barHeight);
      }
    }
  };

  const stopVisualizer = () => {
    const audioContext = audioContextRef.current;
    const source = sourceRef.current;

    if (audioContext) {
      audioContext.close();
    }

    if (source) {
      source.disconnect();
    }
  };

  return (
    <canvas 
      ref={canvasRef} 
      width="150"  // Adjust width as needed
      height="50" // Adjust height as needed
      style={{ 
        backgroundColor: 'transparent', 
        display: 'block', 
        margin: 'auto', 
        maxWidth: '100%', 
        maxHeight: '100%'
      }}
    />
  );
};

export default VoiceVisualizer;
