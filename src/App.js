import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [timer, setTimer] = useState(5);
  const [words, setWords] = useState("");
  const [wordCount, setwordCount] = useState(0);
  const [start, setStart] = useState(false);

  const textAreaRef = useRef(null);

  const handleTextAreaChange = (event) => {
    setWords(event.target.value);
  };
  const endGame = (texts) => {
    let arrayofwords = texts.replace(/[\r\n]{2,}/g, " ").split(" ");
    let filteredarray = arrayofwords.filter((elem) => elem !== "");
    setwordCount(filteredarray.length);
    setStart(false);
  };

  const handleStart = () => {
    setStart((prev) => !prev);
    setTimer(5);
    setWords("");
    setwordCount(0);
    textAreaRef.current.disabled = false;
    textAreaRef.current.focus();
  };

  useEffect(
    function () {
      if (start && timer > 0) {
        setTimeout(function () {
          setTimer((prev) => prev - 1);
        }, 1000);
      } else if (timer <= 0) {
        endGame(words);
      }
    },
    [timer, start]
  );

  return (
    <div className="App">
      <p>How fast can you type?</p>
      <textarea
        onChange={handleTextAreaChange}
        value={words}
        disabled={!start}
        ref={textAreaRef}
      />
      <p>Time remaining : {timer}</p>
      <button type="button" onClick={handleStart} disabled={start}>
        START
      </button>
      <p>Word Count : {wordCount}</p>
    </div>
  );
}

export default App;
