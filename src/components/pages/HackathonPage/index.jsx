import {useEffect, useLayoutEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHackathonById } from '@/redux/features/hackathonsSlice.js';
import styles from './styles.module.scss';

const HackathonPage = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const hackathon = useSelector(state => state.hackathons.hackathon);

   useEffect(() => {
     dispatch(fetchHackathonById(id));
   }, [dispatch, id]);

  const currentDate = new Date();
  const endDate = new Date(JSON.stringify(hackathon.end));
  const startDate = new Date(JSON.stringify(hackathon.start));
  console.log(JSON.stringify(hackathon.end));
  console.log(endDate);
const [level, organization] = hackathon.audience.split(',');
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
          <h1 className={styles.titleHac}>{hackathon.name}</h1>
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
            <h3 className={styles.date}>{level}</h3>
            <h3 className={styles.month}>{organization}</h3>
          </div>
          <div className={styles.hackathonPanelSMall}>
            <h3 className={styles.date}>{hackathon.category}</h3>
            <h3 className={styles.month}>category</h3>
          </div>
          <div className={styles.hackathonPanelSMall}>
            <h3 className={styles.date}>Prizes</h3>
            <h3 className={styles.month}>{hackathon.prize}</h3>
          </div>
        </div>
        <div className={styles.panelContainer}>
          <div className={styles.hackathonPanelSMall}>
            <h3 className={styles.date}>{hackathon.type}</h3>
            <h3 className={styles.month}>Single or team</h3>
          </div>
          <div className={styles.hackathonPanelSMall}>
            <h3 className={styles.date}></h3>
            <h3 className={styles.month}></h3>
          </div>
          <div className={styles.hackathonPanelSMall}>
            <h3 className={styles.date}></h3>
            <h3 className={styles.month}></h3>
          </div>
          <div className={styles.hackathonPanelSMall}>
            <h3 className={styles.date}>Prizes</h3>
            <h3 className={styles.month}>1) .... </h3>
          </div>
        </div>
        <div className={styles.hackathonPanelLower}>
          <div className={styles.description}>
            <h2>About the hackathon</h2>
            <p className={styles.descriptionHac}>{hackathon.description}</p>
          </div>
          <div className={styles.pic}>    <button className={styles.takePartBTN}>TAKE PART</button></div>
        </div>
      </div>
  )
};

export default HackathonPage;
