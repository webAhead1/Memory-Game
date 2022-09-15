import React from "react";
import Images from "./images";
import { useState, useEffect } from "react";
import { shuffle } from "lodash";
import statsBackground from "./images/statsBackground.png";

function App() {
    const [cards,setCards] = useState( shuffle([...Images, ...Images]) );
    const [clicks,setClicks] = useState(0);
    const [won,setWon] = useState(false);
    const [activeCards,setActiveCards] = useState([]);
    const [foundPairs,setFoundPairs] = useState([]);
   // const [running, setRunning] = useState(false);
    const [count, setCount] = useState(100);
    var intervalId;
   
    useEffect(() => {
      intervalId = setInterval(() => {
        setCount(prevCount => (prevCount > 0 ? prevCount - 1 : prevCount));
        // setCount(prevCount => (prevCount - 20))
      }, 1000);
    }, []);

  useEffect(() => {
    setInterval(() => {
      setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount));
      // setCount((prevCount) => prevCount - 1);
    }, 1000);
  }, []);

  function startOver() {
    setCards(shuffle([...Images, ...Images]));
    setFoundPairs([]);
    setWon(false);
    setClicks(0);
    setCount(60);
    setActiveCards([]);
  }

  function flipCard(index) {
    if (won) {
      setCards(shuffle([...Images, ...Images]));
      setFoundPairs([]);
      setWon(false);
      setClicks(0);
     // setRunning(true);
      setCount(100);
      setActiveCards([]);
    }

<<<<<<< HEAD
    function flipCard(index) {
      if (won) {
        setCards(shuffle([...Images, ...Images]));
        setFoundPairs([]);
        setWon(false);
        setClicks(0);
        //setRunning(false);
        setCount(0);
      
      }
    
      if (activeCards.length === 0) {
        setActiveCards([index]);
        
      }
      if (activeCards.length === 1) {
        const firstIndex = activeCards[0];
        const secondsIndex = index;
        if (cards[firstIndex] === cards[secondsIndex]) {
          if (foundPairs.length + 2 === cards.length) {
            setWon(true);
            console.log({intervalId});
            alert(5)
    
            clearInterval(intervalId);
          }
          setFoundPairs( [...foundPairs, firstIndex, secondsIndex] );
        }
        setActiveCards([...activeCards, index]);
      }
      if (activeCards.length === 2) {
        setActiveCards([index]);
      }
      if(!won) {
        setClicks(clicks + 1);
      }
=======
    if (activeCards.length === 0) {
      setActiveCards([index]);
>>>>>>> 306c539a7696bd4214dd58540d41ee9f8d51732c
    }
    if (activeCards.length === 1) {
      const firstIndex = activeCards[0];
      const secondsIndex = index;
      if (cards[firstIndex] === cards[secondsIndex]) {
        if (foundPairs.length + 2 === cards.length) {
          setWon(true);
        }
        setFoundPairs([...foundPairs, firstIndex, secondsIndex]);
      }
      setActiveCards([...activeCards, index]);
    }
    if (activeCards.length === 2) {
      setActiveCards([index]);
    }
    if (!won) {
      setClicks(clicks + 1);
    }
  }
  return (
    <div className="game">
      <div className="statsPane">
        <div className="stats">
          {won && (
            <>
              You won the game! Congratulations!
              <br />
              <br />
            </>
          )}
          {count === 0 && <> Time ran out! You lost the game</>}
          <br />
          Clicks: {clicks}
          <br />
          <br />
          Found pairs:
          {foundPairs.length / 2}
          <br />
          <br />
          Timer: {count}
          <br />
          <div className="button">
            <button onClick={startOver}>Start Over</button>
          </div>
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
              className={"card-outer " + (flippedToFront ? "flipped" : "")}
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
