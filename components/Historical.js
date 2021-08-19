import { grid } from "../styles/modules/historical.module.css";

export default function Historical({ history, onClick }) {

    const moves = history.map((move, step) => {
      const description ='→ Go to #' + step;

      return (
        <li key={step}>
          <button onClick={() => onClick(step)}>
            {description}
          </button>
        </li>
      );
    })

    return (
        <>
            <p>Previous moves:</p>
            <ol className={grid}>
                {moves}
            </ol>
        </>
    );
}