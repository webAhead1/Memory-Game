import React, { useRef } from "react";
import Images from "./images";
import { useState, useEffect } from "react";
import { shuffle } from "lodash";
import statsBackground from "./images/statsBackground.png";

function App() {
  const [cards, setCards] = useState(shuffle([...Images, ...Images]));
  const [clicks, setClicks] = useState(0);
  const [won, setWon] = useState(false);
  const [activeCards, setActiveCards] = useState([]);
  const [foundPairs, setFoundPairs] = useState([]);
  const [running, setRunning] = useState(true);
  const [count, setCount] = useState(40);
  const intervalId = useRef();

  useEffect(() => {
    if (running === true) {
    intervalId.current = setInterval(() => {
      setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount));
      }, 1000);}
  }, [running]); 

  useEffect(() => {
    if(won || count === 0){
      clearInterval(intervalId.current);
    } 
  }, [won]);

  function startOver() {
    setCards(shuffle([...Images, ...Images]));
    setFoundPairs([]);
    setWon(false);
    setClicks(0);
    setCount(40);
    setRunning(true);
    setActiveCards([]);
  }

  function flipCard(index) {
    if (activeCards.length === 1) {
      const firstIndex = activeCards[0];
      const secondIndex = index;
      if (cards[firstIndex] === cards[secondIndex]) {
        if (foundPairs.length + 2 === cards.length) {
          setWon(true);
          setRunning(false);
        }
        setFoundPairs([...foundPairs, firstIndex, secondIndex]);
      }
      setActiveCards([...activeCards, index]);
    }
    if (activeCards.length === 2) {
      setActiveCards([index]);
    }
    if (activeCards.length === 0) {
      setActiveCards([index]);
    }
    if (!won && count>0) {
      setClicks(clicks + 1);
    }
  }
  return (
    <div className="game">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,400;1,300&display=swap"
        rel="stylesheet"
      ></link>
      <link
        rel="stylesheet"
        type="text/css"
        href="//fonts.googleapis.com/css?family=Irish+Grover"
      />
      <div className="gameName">
        <h1>
          M<br />
          E<br />
          M<br />
          O<br />
          R<br />
          Y<br />
          <br />
          G<br />
          A<br />
          M<br />E
        </h1>
      </div>
      <div className="startButton">
        <button onClick={startOver}>Start Over</button>
      </div>
      <div className="statsPanel">
        <div className="stats">
          Clicks: {clicks}
          <br />
          <br />
          Found pairs: {foundPairs.length / 2}
          <br />
          <br />
          Timer: {count}
          <br />
          <br />
          {won && (
            <>
              <p>Well done! You won the game!</p>
            </>
          )}
          {count === 0 && (
            <>
              <p>Time ran out! you lost..</p>
            </>
          )}
        </div>
        <div className="statsBackground">
          <img src={statsBackground} className="statsBackroundImg" alt="..." />
        </div>
      </div>

      <div className="board">
        {cards.map((card, index) => {
          const flippedToFront =
            activeCards.indexOf(index) !== -1 ||
            foundPairs.indexOf(index) !== -1;
          return (
            <div
              className={"card-outer " + (flippedToFront && count >0 ? "flipped" : "")}
              onClick={() => flipCard(index)}
            >
              <div className="card">
                <div className="front">
                  <img src={card} alt="" />
                </div>
                <div className="back" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;