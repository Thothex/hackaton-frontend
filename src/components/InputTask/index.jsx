import { useRef } from "react";
import styles from "./style.module.scss";
const InputTask = ({ handleSaveInput, type, task, savedValue, disabled }) => {
  console.log("disabled", disabled);
  const answerRef = useRef(null);
  const onSave = () => {
    handleSaveInput({
      answers: { answer: answerRef.current.value },
      type,
      task,
    });
  };
  return (
    <div>
      <form className={styles.inputTask}>
        <input
          className={styles.input}
          disabled={disabled}
          placeholder="Enter answer here"
          ref={answerRef}
          defaultValue={savedValue || ""}
        />
        <button
          className={styles.button}
          disabled={disabled}
          type="button"
          onClick={onSave}
        >
          SAVE
        </button>
      </form>
    </div>
  );
};
export default InputTask;
