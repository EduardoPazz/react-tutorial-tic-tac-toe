import Square from "./Square";
import { grid } from "../styles/modules/board.module.css";

export default function Board({ squares, onClick }) {

  function renderSquares() {
    return [...Array(9).keys()].map(k => (
      <Square
        key={k}
        value={squares[k]}
        onClick={() => onClick(k)}
      />
    ));
  }

  return (
    <div className={grid}>
      {renderSquares()}
    </div>
  );
}