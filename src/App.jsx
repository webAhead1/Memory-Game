import React from "react";
import Images from "./images";
import { useState, useEffect } from "react";
import { shuffle } from "lodash";
import statsBackground from "./images/statsBackground.png";
import { Button, Modal } from 'antd';
import 'antd/dist/antd.css';

function App() {
  const [cards, setCards] = useState(shuffle([...Images, ...Images]));
  const [clicks, setClicks] = useState(0);
  const [won, setWon] = useState(false);
  const [activeCards, setActiveCards] = useState([]);
  const [foundPairs, setFoundPairs] = useState([]);
  // const [running, setRunning] = useState(false);
  const [count, setCount] = useState(100);
  const [isModalOpen, setIsModalOpen] = useState(false);
  var intervalId;

  useEffect(() => {
    intervalId = setInterval(() => {
      setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount));
    }, 1000);
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function startOver() {
    setCards(shuffle([...Images, ...Images]));
    setFoundPairs([]);
    setWon(false);
    setClicks(0);
    setCount(100);
    setActiveCards([]);
  }

  if (won) {
    // setCards(shuffle([...Images, ...Images]));
    // setFoundPairs([]);
    // setWon(false);
    // setClicks(0);
    //setRunning(false);
    // setCount(0);
    // showModal();
  }

  function flipCard(index) {
    if (activeCards.length === 1) {
      const firstIndex = activeCards[0];
      const secondsIndex = index;
      if (cards[firstIndex] === cards[secondsIndex]) {
        if (foundPairs.length + 2 === cards.length) {
          setWon(true);
          console.log({ intervalId });

          clearInterval(intervalId);
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
    if (activeCards.length === 0) {
      setActiveCards([index]);
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
            {/* <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}> */}
            <p>Well done! You won the game!</p>
            {/* </Modal> */}
            </>
          )}
          {count === 0 && <> 
          <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>Time ran out! you lost..</p>
          </Modal>
          </>}
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