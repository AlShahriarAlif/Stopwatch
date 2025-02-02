import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(timer);
      setShowModal(true);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  const handleStartStop = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
      setTime(0);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="stopwatch-container">
      <h1 className="app-title">⏳ Cool Stopwatch</h1>
      <p className="app-subtitle">Track your time effortlessly!</p>

      <div className="stopwatch">
        <div className="time-display">
          <h1>{time}s</h1>
        </div>
        <button
          className={`start-stop-button ${isRunning ? "stop-button" : ""}`}
          onClick={handleStartStop}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p className="modal-text">🎉 Great! You tracked {time} seconds!</p>
            <button className="ok-button" onClick={handleCloseModal}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
