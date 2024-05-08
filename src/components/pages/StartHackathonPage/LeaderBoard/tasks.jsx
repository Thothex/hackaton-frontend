import styles from '../style.module.scss'
import React from "react";
const Task =(stat)=>{
    return(
        <div className={styles.leaderboard}>
            <h3 className={styles.title}>Лидерборд</h3>
        </div>
    )
}
export default React.memo(Task)