import styles from './style.module.scss'
const InputTask = (props) =>{
    return(
        <div className={styles.inputTask}>
            <h3>{props.name}</h3>
            <form>
            <input className={styles.input} placeholder='Enter answer here'/>
            <button className={styles.button}>save</button>
        </form>
        </div>
    )
}
export default InputTask
