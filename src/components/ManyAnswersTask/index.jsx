import { useEffect, useState } from "react";
import CCheckbox from "../CustomCheckbox";
import styles from "./style.module.scss";
import { useDispatch } from "react-redux";

import PropTypes from "prop-types";
const ManyAnswersTask = ({ task, handleSaveMany, type, captain, teamId }) => {
  const dispatch = useDispatch();
  const [userAnswers, setUserAnswers] = useState({});
  useEffect(() => {
    // TODO здесь воткнуть диспатч получения своих ответов, когда будет ручка
    // dispatch(fetchUserAnswers(task.id))
    // или воткнуть его в родительский компонент и передать пропсами или
    // через селектор
  }, [dispatch]);
  const optionsArray = Object.entries(task.answers);

  const handleChangeOption = (checked, dateset) => {
    setUserAnswers({
      ...userAnswers,
      [dateset.uuid]: {
        ...userAnswers[dateset.uuid],
        checked: checked,
      },
    });
  };
  const onSave = () => {
    handleSaveMany({ answers: userAnswers, type, task });
  };
  return (
    <div className={styles.manyAanswersTask}>
      <form>
        {captain
          ? optionsArray.map(([key, value]) => {
              return (
                <CCheckbox
                  key={key}
                  uuid={key}
                  onChange={handleChangeOption}
                  label={value.text}
                  checked={userAnswers[key]?.checked}
                />
              );
            })
          : optionsArray.map(([key, value], index) => {
              return (
                <div key={key}>
                  {index + 1}. {value.text}
                </div>
              );
            })}

        {captain && (
          <button className={styles.button} type="button" onClick={onSave}>
            Save
          </button>
        )}
      </form>
    </div>
  );
};

ManyAnswersTask.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired,
    answers: PropTypes.objectOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        isRight: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }).isRequired,
  handleSaveMany: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  captain: PropTypes.bool,
  teamId: PropTypes.number,
};
export default ManyAnswersTask;
