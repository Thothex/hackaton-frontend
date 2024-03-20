import React from 'react';
import styles from './styles.module.scss';
import {useNavigate} from "react-router-dom";

const HackathonPanel = (props) => {
    const navigate = useNavigate();
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
    const startMonth = startDate.toLocaleString('en-US', { month: 'long' });
    const formattedEndDate = endDate.getDate();
    const endMonth = endDate.toLocaleString('en-US', { month: 'long' });
    return (
        <div className={`${styles.hackathonPanel} ${
            status === "Registration is open" ? styles.panelOpen :
                status === "In progress" ? styles.panelInProgress :
                    status === "Finished" ? styles.panelClosed :
                        ""}`}
        >
            <div className={styles.hackathonPanelHeader}>
                <div className={styles.hackathonPanelHeaderLeft}>
                    <h3 className={styles.title}>{props.name}</h3>
                    <div className={`${styles.status} ${
                        status === "Registration is open" ? styles.registrationOpen :
                            status === "In progress" ? styles.inProgress :
                                status === "Finished" ? styles.finished :
                                    ""}`}>
                        {status}
                    </div>
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
            <button
                className={`${styles.button} ${
                    status === "Registration is open" ? styles.panelOpenButton :
                        status === "In progress" ? styles.panelInProgressButton :
                            status === "Finished" ? styles.panelClosedButton :
                                ""}`}
                onClick={() => {
                    navigate(`/hackathon/${props.id}`)

                }}
            >
                READ MORE
            </button>
        </div>
    );
}

export default HackathonPanel;
