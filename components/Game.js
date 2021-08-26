import React, { useEffect, useState } from "react";
import calculateWinner from "../lib/calculateWinner";
import concatClasses from "../lib/concatClasses";
import gameStyles from "../styles/modules/game.module.css";
import promptStyles from "../styles/modules/prompt.module.css";
import utilStyles from "../styles/modules/utils.module.css";
import Board from "./Board";
import Historical from "./Historical";



export default function Game() {

  const [squaresHistory, setSquaresHistory] = useState([
    Array(9).fill(null)
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  
  function handleClick(i) {
    const history = squaresHistory.slice(0, stepNumber + 1);
    const currentSquares = history[history.length - 1];

    if ((calculateWinner(currentSquares) != null) 
        || (currentSquares[i] != null)) {
      return;
    }

    currentSquares[i] = xIsNext ? "x" : "o";

    setSquaresHistory([...history, currentSquares]);
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
  }


  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  };

  function render() {

    return (
      <section className={gameClassName}>
        <p className={promptStyles.prompt}>{prompt}</p>
        <div className={utilStyles['two-col']}>
          <Board 
            squares={current}
            onClick={i => handleClick(i)}
          />
          <aside style={{textAlign: 'center', margin: '10px'}}>
            <Historical
              history={squaresHistory}
              onClick={step => jumpTo(step)}
            />
          </aside>
        </div>
      </section>
    )
  }
  
  return render();
}