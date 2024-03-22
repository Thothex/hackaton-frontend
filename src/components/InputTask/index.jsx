import styles from './style.module.scss'
const InputTask = (props) =>{
    return(
        <div className={styles.inputTask}>
            <h3>{props.name}</h3>
            <input className={styles.input} placeholder='Enter answer here'/>
            <button className={styles.button}>save</button>
        </div>
    )
}
export default InputTask
