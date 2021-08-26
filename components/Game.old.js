import React from "react";
import Board from "./Board";
import concatClasses from "../lib/concatClasses";
import calculateWinner from "../lib/calculateWinner"
import gameStyles from "../styles/modules/game.module.css";
import promptStyles from "../styles/modules/prompt.module.css";
import utilStyles from "../styles/modules/utils.module.css";
import Historical from "./Historical";



export default class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [ ...current.squares ];

    if ((calculateWinner(squares) != null) || (squares[i] != null)) {
      return;
    }

    squares[i] = this.state.xIsNext ? "x" : "o";
    
    this.setState({
      history: [ ...history, { squares: squares }],
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }


  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares)

    const prompt = (winner === null)
      ? `Next player: ${this.state.xIsNext ? "X" : "O"}`
      : `Winner: ${winner.toUpperCase()}`;

    const gameClassName = concatClasses(gameStyles.game,
      utilStyles['rounded-full'],
      utilStyles.shadow);

    return (
      <section className={gameClassName}>
        <p className={promptStyles.prompt}>{prompt}</p>
        <div className={utilStyles['two-col']}>
          <Board 
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
          <aside style={{textAlign: 'center', margin: '10px'}}>
            <Historical 
              history={history}
              onClick={step => this.jumpTo(step)}

            />
          </aside>
        </div>
      </section>
    );
  }
}