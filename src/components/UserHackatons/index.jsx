import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import HackatonDate from "../HackatonDate";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/scss/alice-carousel.scss";

const UserHackatons = ({ hack, date }) => {
  const navigate = useNavigate();

  const filteredHackatons = hack.filter((hackaton) => {
    const hackStartDate = new Date(hackaton.start);
    const hackEndDate = new Date(hackaton.end);
    const checkDate = new Date(date);

    hackStartDate.setHours(0, 0, 0, 0);
    hackEndDate.setHours(0, 0, 0, 0);
    checkDate.setHours(0, 0, 0, 0);

    return checkDate >= hackStartDate && checkDate <= hackEndDate;
  });

  const handleRedirect = (hackatonId) => {
    navigate(`/hackathon/${hackatonId}`);
  };

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 5 },
  };

  const items = filteredHackatons.map((hackaton) => (
    <div key={hackaton.id} className={styles.hackaton}>
      <div className={styles.info}>
        <h6 className={styles.name}>{hackaton.name}</h6>
        <span className={styles.description}>{hackaton.description}</span>
      </div>
      <div className={styles.date}>
        <HackatonDate props={{ end: hackaton.end, start: hackaton.start }} />
      </div>
      <button
        onClick={() => handleRedirect(hackaton.id)}
        className={styles.viewBtn}
      >
        VIEW ALL
      </button>
    </div>
  ));

  return (
    <div>
      {hack.length > 0 && (
        <div className={styles.hackatonsContainer}>
          <h4 className={styles.head}>My hackatons</h4>
          <div className={styles.hackatonsCards}>
            {filteredHackatons.length > 0 ? (
              filteredHackatons.length > 4 ? (
                <AliceCarousel
                  mouseTracking
                  items={items}
                  responsive={responsive}
                  disableDotsControls
                  autoPlayInterval={4000}
                />
              ) : (
                items
              )
            ) : (
              <span className={styles.message}>No scheduled hackathons</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHackatons;
