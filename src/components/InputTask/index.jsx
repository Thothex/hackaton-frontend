import { useRef } from 'react'
import styles from './style.module.scss'
const InputTask = ({ handleSaveInput, type, task, savedValue, disabled }) => {
    console.log('disabled', disabled);
    const answerRef = useRef(null)
    const onSave = () => {
        handleSaveInput({answers: {answer: answerRef.current.value}, type, task})
    }
    return(
        <div className={styles.inputTask}>
            <form>
                <input className={styles.input} disabled={disabled} placeholder='Enter answer here' ref={answerRef} defaultValue={savedValue || ''} />
                <button className={styles.button} disabled={disabled} type='button' onClick={onSave}>Save</button>
        </form>
        </div>
    )
}
export default InputTask
