import { useState } from 'react';
import CCheckbox from '../CustomCheckbox'
import styles from './style.module.scss'

import PropTypes from 'prop-types' 
const ManyAnswersTask = ({ task }) => {
    
    const [userAnswers, setUserAnswers] = useState({});
    const optionsArray = Object.entries(task.answers);

    const handleChangeOption = (checked, dateset) => {

        setUserAnswers({
            ...userAnswers,
            [dateset.uuid]: {
                ...userAnswers[dateset.uuid],
                checked: checked
            }
        })

    }
    console.log('userAnswers', userAnswers);
    return(
        <div className={styles.manyAanswersTask}>
            <form>
                {optionsArray.map(([key, value]) => {
                    return <CCheckbox key={key} uuid={key} onChange={handleChangeOption} label={value.text} checked={userAnswers[key]?.checked} />
                
                })}
            <button className={styles.button}>Save</button>
        </form>
        </div>
    )
}

ManyAnswersTask.propTypes = {
    name: PropTypes.string,
}
export default ManyAnswersTask
