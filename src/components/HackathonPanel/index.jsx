import styles from './styles.module.scss'
const HackathonPanel = (props) => {
    return(
        <div className={styles.hackathonPanel} style={{backgroundColor: props.backgroundColor}}>
            <div>
                <div>
                <h3>{props.name}</h3>
                    <div>{props.status}</div>
                </div>
                <div>
                    <p>{props.start}</p>
                    <hr/>
                    <p>{props.end}</p>
                </div>
                <button>READ MORE</button>
            </div>
        </div>
    )
}
export default HackathonPanel;
