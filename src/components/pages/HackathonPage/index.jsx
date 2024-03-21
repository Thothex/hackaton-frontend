import {useEffect, useLayoutEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHackathonById } from '@/redux/features/hackathonsSlice.js';
import styles from './styles.module.scss';

const HackathonPage = () => {
  const navigate = useNavigate();
   const { id } = useParams();
   const dispatch = useDispatch();
   const hackathon = useSelector(state => state.hackathons.hackathon);

   useEffect(() => {
     dispatch(fetchHackathonById(id));
   }, [dispatch, id]);
  if (!hackathon) {
    return <div>Loading...</div>;
  }
  const currentDate = new Date();
  const endDate = new Date(hackathon.end);
  const startDate = new Date(hackathon.start);

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
    const startMonth = startDate.toLocaleString('en-US', { month: 'long' });
  const formattedEndDate = endDate.getDate();
  const yearStart = startDate.getFullYear();
  const yearEnd = endDate.getFullYear();
    const endMonth = endDate.toLocaleString('en-US', { month: 'long' });
console.log(formattedStartDate, startMonth, formattedEndDate, endMonth);
  return (
      <div className={styles.hackathonPage}>
        <div
            className={`${styles.hackathonPanelUpper} ${
                status === "Registration is open" ? styles.panelOpen :
                    status === "In progress" ? styles.panelInProgress :
                        status === "Finished" ? styles.panelClosed :
                            ""}`}
        >
          <div className={styles.upperHello}>
            <button onClick={()=> navigate('/hackathon')}>{`<-back`}</button>
            <h4>Welcome to the hackathon 👋🏼</h4>
          </div>
          <h1 className={styles.titleHac}>{hackathon.name}</h1>
        </div>
        <div
            className={`${styles.panelContainer} ${
                status === "Registration is open" ? styles.panelOpenContainer :
                    status === "In progress" ? styles.panelInProgressContainer :
                        status === "Finished" ? styles.panelClosedContainer :
                            ""}`}
        >
          <div className={styles.hackathonPanelSMall}>
              <div className={styles.timeContainer}>
              <div className={styles.time}>
            <h4 className={styles.date}>{formattedStartDate}</h4>
            <p className={styles.month}>{startMonth}</p>
                  <p className={styles.month}>{yearStart}</p>
              </div>
                  <div className={styles.hr}/>
              <div className={styles.time}>
            <h4 className={styles.date}>{formattedEndDate}</h4>
            <p className={styles.month}>{endMonth}</p>
                  <p className={styles.month}>{yearEnd}</p>
              </div>
          </div>
          </div>
          <div className={styles.hackathonPanelSMall}>
            <h3 className={styles.date}>{level}</h3>
            <h3 className={styles.month}>{organization}</h3>
          </div>
          <div className={styles.hackathonPanelSMall}>
            <h3 className={styles.date}>{hackathon.category}</h3>
            <h3 className={styles.month}>category</h3>
          </div>
        </div>
        <div
            className={`${styles.panelContainer} ${
                status === "Registration is open" ? styles.panelOpenContainer :
                    status === "In progress" ? styles.panelInProgressContainer :
                        status === "Finished" ? styles.panelClosedContainer :
                            ""}`}
        >
          <div className={styles.hackathonPanelSMall}>
            <h3 className={styles.date}>{hackathon.type}</h3>
            <h3 className={styles.month}>Single or team</h3>
          </div>
            <div className={styles.hackathonPanelSMall}>
                <h3 className={styles.date}>Prizes</h3>
                <h3 className={styles.month}>{hackathon.prize}</h3>
            </div>
          <div className={styles.hackathonPanelSMall}>
            <h3 className={styles.date}>
              {hackathon.organizations.map((org) => (
                <div key={org.id} className={styles.hackathonPanelOrganization}>{org.name}</div>  
              ))
              
              }
            </h3>
            <h3 className={styles.month}>organizations</h3>
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
