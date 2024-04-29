import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HackatonDate from "../HackatonDate";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import PropTypes from "prop-types";

const OrganizationHackathons = ({ hack }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleRedirect = (hackatonId) => {
        navigate(`/hackathon/${hackatonId}`);
    };

    const items = hack.map((hackaton) => (
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
                {t("ProfilePage.view-all-hack")}
            </button>
        </div>
    ));

    return (
        <div>
            {hack.length > 0 && (
                <div className={styles.hackatonsContainer}>
                    <div className={styles.hackatonsCards}>
                        {items.length > 0 ? (
                            items.length > 4 ? (
                                <AliceCarousel
                                    mouseTracking
                                    items={items}
                                    responsive={{
                                        0: { items: 1 },
                                        568: { items: 2 },
                                        1024: { items: 5 },
                                    }}
                                    disableDotsControls
                                    autoPlayInterval={4000}
                                />
                            ) : (
                                items
                            )
                        ) : (
                            <span className={styles.message}>
                {t("ProfilePage.no-scheduled-hackathons")}
              </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

OrganizationHackathons.propTypes = {
    hack: PropTypes.array.isRequired
}

export default OrganizationHackathons;
