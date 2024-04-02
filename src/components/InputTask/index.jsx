import { useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "./style.module.scss";
const InputTask = ({ handleSaveInput, type, task, savedValue, disabled }) => {
  const { t } = useTranslation();
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
          placeholder={t("TestPage.Enter answer here")}
          ref={answerRef}
          defaultValue={savedValue || ""}
        />
        <button
          className={styles.button}
          disabled={disabled}
          type="button"
          onClick={onSave}
        >
          {t("ProfilePage.save")}
        </button>
      </form>
    </div>
  );
};
export default InputTask;
