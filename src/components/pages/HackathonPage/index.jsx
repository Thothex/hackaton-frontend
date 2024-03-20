import styles from './styles.module.scss';
import React from "react";
const audience = '14-17 year,school students';
const [age, organization] = audience.split(',')
const HackathonPage = (props) => {
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
      <div className={styles.hackathonPage}>
        <div className={styles.hackathonPanelUpper}>
          <div className={styles.upperHello}>
            <button>{`<-back`}</button>
            <h4>Welcome to the hackathon 👋🏼</h4>
          </div>
          <h1 className={styles.titleHac}>{props.name}HACK</h1>
        </div>
        <div className={styles.panelContainer}>
          <div className={styles.hackathonPanelSMall}>
            <h4 className={styles.date}>{formattedStartDate}</h4>
            <p className={styles.month}>{startMonth}</p>
            <div className={styles.hr}/>
            <h4 className={styles.date}>{formattedEndDate}</h4>
            <p className={styles.month}>{endMonth}</p>
          </div>
          <div className={styles.hackathonPanelSMall}>
            <h3 className={styles.date}>{age}</h3>
            <h3 className={styles.month}>{organization}</h3>
          </div>
          <div className={styles.hackathonPanelSMall}>
            <h3 className={styles.date}>{props.category}Science</h3>
            <h3 className={styles.month}>{organization}</h3>
          </div>
          <div className={styles.hackathonPanelSMall}>
            <h3 className={styles.date}>Prizes</h3>
            <h3 className={styles.month}>{props.prizes}1) .... </h3>
          </div>
        </div>
        <div className={styles.hackathonPanelLower}>
          <div className={styles.description}>
            <h2>About the hackathon</h2>
            <p className={styles.descriptionHac}>{props.description}Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consectetur. Commodo leo ipsum arcu vel. Faucibus arcu scelerisque pellentesque consectetur facilisi elit at enim vitae. Venenatis integer duis non donec nec non. Cursus tortor gravida elit at. Lorem ipsum dolor sit amet consectetur. Commodo leo ipsum arcu vel. Faucibus arcu scelerisque pellentesque consectetur facilisi elit at enim vitae. Venenatis integer duis non donec nec non. Cursus tortor gravida elit at.</p>
          </div>
          <div className={styles.pic}>    <button className={styles.takePartBTN}>TAKE PART</button></div>
        </div>
      </div>
  )
};

export default HackathonPage;
