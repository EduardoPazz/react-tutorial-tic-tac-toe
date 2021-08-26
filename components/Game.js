import React, { useEffect, useState } from "react";
import calculateWinner from "../lib/calculateWinner";
import concatClasses from "../lib/concatClasses";
import gameStyles from "../styles/modules/game.module.css";
import promptStyles from "../styles/modules/prompt.module.css";
import utilStyles from "../styles/modules/utils.module.css";
import Board from "./Board";
import Historical from "./Historical";



export default function Game() {

  const [squaresHistory, setSquaresHistory] = useState([{
    squares: Array(9).fill(null)
  }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  
  function handleClick(i) {
    const currentHistory = squaresHistory.slice(0, stepNumber + 1);
    const currentSquares = currentHistory[currentHistory.length - 1]
      .squares
      .slice();

    if ((calculateWinner(currentSquares) != null) 
        || (currentSquares[i] != null)) {
      return;
    }

    currentSquares[i] = xIsNext ? "x" : "o";

    setSquaresHistory([...currentHistory, {squares: currentSquares}]);
    setStepNumber(currentHistory.length);
    setXIsNext(!xIsNext);
  }


  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  };

  function getCurrentSquares() {
    return squaresHistory[stepNumber].squares;
  }

  function getPrompt() {
    const currentSquares = getCurrentSquares();
    const winner = calculateWinner(currentSquares);

    if (winner !== null) return `Winner: ${winner.toUpperCase()}`;

    if (currentSquares.every(square => square !== null)) {
      return `Draw. Rollback to try again`;
    }

    return `Next player: ${xIsNext ? "X" : "O"}`;
  }
 
  const gameClassName = concatClasses(gameStyles.game,
    utilStyles['rounded-full'],
    utilStyles.shadow);

  return (
    <section className={gameClassName}>
      <p className={promptStyles.prompt}>{getPrompt()}</p>
      <div className={utilStyles['two-col']}>
        <Board 
          squares={getCurrentSquares()}
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