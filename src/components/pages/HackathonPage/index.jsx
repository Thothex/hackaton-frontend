import {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHackathonById, putHackathon } from '@/redux/features/hackathonsSlice.js';
import { Button, Flex } from 'antd'
import styles from './styles.module.scss';
import Loading from '@/components/Loading';
import screenfull from 'screenfull';
import DashboardFloatingButton from '@/components/DashboardFloatingButton';

const HackathonPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userStore.userInfo);
  const { id } = useParams();
  const dispatch = useDispatch();
  const hackathon = useSelector(state => state.hackathons.hackathon);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    dispatch(fetchHackathonById(id));
  }, [dispatch, id]);

  const toggleFullscreen = () => {
    if (screenfull.isEnabled) {
      if (!screenfull.isFullscreen) {
        screenfull.request(iframeRef.current);
      } else {
        screenfull.exit();
      }
      setIsFullscreen(prevState => !prevState);
    }
  };

  if (!hackathon) {
    return <Loading />;
  }


  const isOrg = user.isOrg && user.id === hackathon.organizer_id
  const currentDate = new Date();
  const endDate = new Date(hackathon.end);
  const startDate = new Date(hackathon.start);

  const [level, organization] = hackathon.audience ? hackathon.audience.split(',') : ["", ""];
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

  const handleEndHackathon = () => {
    dispatch(putHackathon({...hackathon, status: "Finished" }))
  }
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
            <button onClick={()=> navigate('/hackathon')}>{`<—`}</button>
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
            <h3 className={styles.date}>{hackathon.category.name}</h3>
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
            {status === "Registration is open" && user &&  <div className={styles.pic}  onClick={()=> navigate(`/hackathon/${hackathon.id}/start`)} ><button className={styles.takePartBTN}>TAKE PART</button></div>
            }
            {status === "In progress" && user &&  <div className={styles.pic}  onClick={()=> navigate(`/hackathon/${hackathon.id}/start`)} ><button className={styles.takePartBTN}>TAKE PART</button></div>
            }
            {status === "Registration is open" && !user &&  <div className={styles.pic}  ><button className={styles.takePartBTN}>SIGN IN/UP TO TAKE PART</button></div>
            }
            {status === "In progress" && !user &&  <div className={styles.pic}><button className={styles.takePartBTN}>SIGN IN/UP TO TAKE PART</button></div>
            }
            {status === "Finished" &&  <div className={styles.pic} ><button disabled={status === "Finished"} className={styles.takePartBTN}>Hackathon is over :(</button></div>
            }
      </div>

      {isOrg && hackathon.status !== "Finished" &&
        <>
          <Flex wrap="wrap" gap="small" >
            <Button type="primary" danger onClick={handleEndHackathon}>Hackathon end</Button>
          </Flex>
          <DashboardFloatingButton onClick={toggleFullscreen} />
          <div className={styles.iframeWrapper}>
            <iframe ref={iframeRef} src={`http://localhost:5173/dashboard?id=${id}`} />
          </div>
        </>
      }
      </div>
  )
};

export default HackathonPage;
