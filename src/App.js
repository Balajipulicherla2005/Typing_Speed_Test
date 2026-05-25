import React, { useState, useEffect } from "react";
import "./App.css";

const sampleText =
  "React is a JavaScript library for building user interfaces.";

function App() {

  const [text, setText] =
    useState("");

  const [selectedTime, setSelectedTime] =
    useState(60);

  const [timeLeft, setTimeLeft] =
    useState(60);

  const [isRunning, setIsRunning] =
    useState(false);

  const [isStarted, setIsStarted] =
    useState(false);

  const [wpm, setWpm] =
    useState(0);

  useEffect(() => {

    let timer;

    if (isRunning && timeLeft > 0) {

      timer = setInterval(() => {

        setTimeLeft((prev) => prev - 1);

      }, 1000);

    }

    if (timeLeft === 0) {

      setIsRunning(false);

      calculateWPM();

    }

    return () => clearInterval(timer);

  }, [isRunning, timeLeft]);

  const handleChange = (e) => {

    if (!isStarted) return;

    setText(e.target.value);

  };

  const calculateWPM = () => {

    const words =
      text.trim() === ""
        ? 0
        : text.trim().split(" ").length;

    setWpm(words);

  };

  const startTest = () => {

    setIsStarted(true);

    setIsRunning(true);

  };

  const restartTest = () => {

    setText("");

    setTimeLeft(selectedTime);

    setWpm(0);

    setIsRunning(false);

    setIsStarted(false);

  };

  return (

    <div className="container">

      <h1>Typing Speed Test</h1>

      <p className="sample-text">
        {sampleText}
      </p>

      <h2>
        Time Left: {timeLeft} Seconds
      </h2>

      <select
        value={selectedTime}
        onChange={(e) => {

          setSelectedTime(
            Number(e.target.value)
          );

          setTimeLeft(
            Number(e.target.value)
          );

        }}
        disabled={isStarted}
      >

        <option value={30}>
          30 Seconds
        </option>

        <option value={60}>
          60 Seconds
        </option>

        <option value={120}>
          120 Seconds
        </option>

      </select>

      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Click Start to begin..."
        disabled={!isStarted}
      />

      <div className="results">

        <h3>
          Words Typed: {

            text.trim() === ""
              ? 0
              : text.trim().split(" ").length

          }
        </h3>

        <h3>
          WPM: {wpm}
        </h3>

      </div>

      <button onClick={startTest}>
        Start Test
      </button>

      <button onClick={restartTest}>
        Restart
      </button>

    </div>

  );

}

export default App;