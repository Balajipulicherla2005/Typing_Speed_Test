import React, {
  useState,
  useEffect,
  useRef
} from "react";

import "./App.css";

const texts = [

  "Improve your typing speed and accuracy with a real-time timer-based typing test.",

  "Frontend developers use React to build beautiful and responsive applications.",

  "Practice typing daily to improve your keyboard speed and overall productivity.",

  "Modern websites require clean UI design and responsive user experiences.",

  "Consistency and daily practice are the keys to mastering fast and accurate typing skills.",

  "Software engineers use efficient typing skills to increase productivity during development.",

  "Learning React helps developers build scalable and interactive frontend applications quickly.",

  "Typing faster with fewer mistakes improves coding speed and overall technical performance.",

  "Professional portfolio projects should focus on clean layouts and smooth user experiences.",

  "Responsive design ensures websites work properly across desktops tablets and mobile devices.",

  "Glassmorphism design creates modern interfaces using blur transparency and subtle borders.",

  "Web developers continuously improve their UI and UX skills to create better digital products.",

  "Typing tests are commonly used to measure typing speed accuracy and keyboard efficiency.",

  "A strong understanding of JavaScript is essential for becoming a successful React developer.",

  "Frontend projects become more impressive when combined with animations and modern styling.",

  "Building real world projects helps beginners gain confidence and improve development skills.",

  "Efficient coding practices reduce bugs improve readability and make applications scalable.",

  "Modern applications use responsive layouts smooth animations and optimized user interactions.",

  "Practicing keyboard shortcuts can significantly improve developer productivity and workflow.",

  "Recruiters prefer projects that demonstrate practical skills modern UI and clean architecture.",

  "Professional websites focus on accessibility performance responsive layouts and elegant designs.",

  "Typing accurately under time pressure helps improve concentration and keyboard familiarity.",

  "Daily coding practice strengthens problem solving abilities and improves programming confidence.",

  "React components allow developers to create reusable and maintainable UI structures efficiently.",

  "Interactive user experiences increase engagement and make applications feel more professional."

];
function App() {

  const inputRef =
    useRef(null);

  const [textIndex, setTextIndex] =
    useState(0);

  const [sampleText, setSampleText] =
    useState(texts[0]);

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

  const [accuracy, setAccuracy] =
    useState(100);

  const [mistakes, setMistakes] =
    useState(0);

  const [darkMode, setDarkMode] =
    useState(true);

  useEffect(() => {

    let timer;

    if (
      isRunning &&
      timeLeft > 0
    ) {

      timer = setInterval(() => {

        setTimeLeft(
          (prev) => prev - 1
        );

      }, 1000);

    }

    if (timeLeft === 0) {

      setIsRunning(false);

      setIsStarted(false);

    }

    return () =>
      clearInterval(timer);

  }, [
    isRunning,
    timeLeft
  ]);

  const nextParagraph = () => {

    const nextIndex =
      (textIndex + 1) %
      texts.length;

    setTextIndex(nextIndex);

    setSampleText(
      texts[nextIndex]
    );

    setText("");

  };

  const handleChange = (e) => {

    if (
      !isStarted ||
      timeLeft === 0
    ) return;

    const value =
      e.target.value;

    setText(value);

    let correctChars = 0;

    let wrongChars = 0;

    for (
      let i = 0;
      i < value.length;
      i++
    ) {

      if (
        value[i] ===
        sampleText[i]
      ) {

        correctChars++;

      }

      else {

        wrongChars++;

      }

    }

    setMistakes(wrongChars);

    const accuracyValue =

      value.length === 0
        ? 100
        : Math.round(
            (
              correctChars /
              value.length
            ) * 100
          );

    setAccuracy(
      accuracyValue
    );

    const words =
      value.trim() === ""
        ? 0
        : value
            .trim()
            .split(" ")
            .length;

    setWpm(words);

    if (
      value.trim() ===
      sampleText.trim()
    ) {

      nextParagraph();

    }

  };

  const startTest = () => {

    setIsStarted(true);

    setIsRunning(true);

    setTimeout(() => {

      inputRef.current.focus();

    }, 100);

  };

  const restartTest = () => {

    setText("");

    setTimeLeft(
      selectedTime
    );

    setWpm(0);

    setAccuracy(100);

    setMistakes(0);

    setIsRunning(false);

    setIsStarted(false);

  };

  const progress =
    (
      (selectedTime - timeLeft) /
      selectedTime
    ) * 100;

  return (

    <div
      className={
        darkMode
          ? "app dark"
          : "app light"
      }
    >

      <nav className="navbar">

        <div className="logo">

          ⌨ TypeMaster

        </div>

        <div className="nav-actions">

          <div className="live-badge">

            ● LIVE

          </div>

          <button
            className="theme-btn"
            onClick={() =>
              setDarkMode(
                !darkMode
              )
            }
          >

            {

              darkMode
                ? "☀ Light"
                : "🌙 Dark"

            }

          </button>

        </div>

      </nav>

      <div className="container">

        <div className="stats-grid">

          <div className="stat-card">

            <h2>
              {timeLeft}s
            </h2>

            <p>
              Time
            </p>

          </div>

          <div className="stat-card">

            <h2>
              {wpm}
            </h2>

            <p>
              WPM
            </p>

          </div>

          <div className="stat-card">

            <h2>
              {accuracy}%
            </h2>

            <p>
              Accuracy
            </p>

          </div>

          <div className="stat-card">

            <h2>
              {mistakes}
            </h2>

            <p>
              Mistakes
            </p>

          </div>

        </div>

        <div className="progress-bar">

          <div
            className="progress"
            style={{
              width: `${progress}%`
            }}
          ></div>

        </div>

        <div
          className="typing-wrapper"
          onClick={() =>
            inputRef.current.focus()
          }
        >

          <div className="typing-text">

            {

              sampleText
                .split("")
                .map(
                  (
                    char,
                    index
                  ) => {

                    let className = "";

                    if (
                      index <
                      text.length
                    ) {

                      className =
                        char ===
                        text[index]
                          ? "correct"
                          : "wrong";

                    }

                    if (
                      index ===
                      text.length
                    ) {

                      className +=
                        " active";

                    }

                    return (

                      <span
                        key={index}
                        className={className}
                      >

                        {char}

                      </span>

                    );

                  }
                )

            }

          </div>

          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={handleChange}
            className="hidden-input"
          />

        </div>

        <div className="bottom-controls">

          <select
            value={selectedTime}
            onChange={(e) => {

              setSelectedTime(
                Number(
                  e.target.value
                )
              );

              setTimeLeft(
                Number(
                  e.target.value
                )
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

          <div className="button-group">

            <button
              className="start-btn"
              onClick={startTest}
            >

              Start Test

            </button>

            <button
              className="restart-btn"
              onClick={restartTest}
            >

              Restart

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default App;