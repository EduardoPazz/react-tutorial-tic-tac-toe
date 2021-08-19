import { square } from "../styles/modules/square.module.css";

export default function Square({ value, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={square}
    >
      <div>{value}</div>
    </button>
  );
}