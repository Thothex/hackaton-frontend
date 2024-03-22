import styles from './style.module.scss'
const InputTask = (props) =>{
    return(
        <div className={styles.inputTask}>
            <h3>{props.name}</h3>
            <input/>
            <button></button>
        </div>
    )
}
export default InputTask
