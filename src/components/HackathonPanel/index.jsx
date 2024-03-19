import React from 'react';
import styles from './styles.module.scss';

const HackathonPanel = (props) => {
    const currentDate = new Date();
    const endDate = new Date(props.end);
    const startDate = new Date(props.start);

    let status;

    if (currentDate < startDate) {
        status = "Registration is open";
    } else if (currentDate >= startDate && currentDate <= endDate) {
        status = "In progress";
    } else {
        status = "Finished";
    }

    const formattedStartDate = startDate.getDate();
    const startMonth = startDate.toLocaleString('default', { month: 'long' });
    const formattedEndDate = endDate.getDate();
    const endMonth = endDate.toLocaleString('default', { month: 'long' });

    return (
        <div className={styles.hackathonPanel} style={{ backgroundColor: props.backgroundColor }}>
            <div className={styles.hackathonPanelHeader}>
                <div className={styles.hackathonPanelHeaderLeft}>
                    <h3 className={styles.title}>{props.name}</h3>
                    <div className={styles.status}> {status}</div>
                    <h3 className={styles.area}>science</h3>
                </div>
                <div className={styles.hackathonPanelHeaderRight}>
                    <h4 className={styles.date}>{formattedStartDate}</h4>
                    <p className={styles.month}>{startMonth}</p>
                    <hr />
                    <h4 className={styles.date}>{formattedEndDate}</h4>
                    <p className={styles.month}>{endMonth}</p>
                </div>
            </div>
            <button className={styles.button}>READ MORE</button>
        </div>
    );
}

export default HackathonPanel;
