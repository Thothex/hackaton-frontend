import { useRef } from 'react'
import styles from './style.module.scss'
const InputTask = ({ handleSaveInput, type, task }) => {
    const answerRef = useRef(null)
    const onSave = () => {
        handleSaveInput({answers: {answer: answerRef.current.value}, type, task})
    }
    return(
        <div className={styles.inputTask}>
            <form>
                <input className={styles.input} placeholder='Enter answer here' ref={answerRef} />
            <button className={styles.button} type='button' onClick={onSave}>Save</button>
        </form>
        </div>
    )
}
export default InputTask
