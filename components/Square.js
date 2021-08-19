import styles from "../styles/modules/square.module.css";

export default function Square(props) {
  return (
    <button 
      className={styles.square} 
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}