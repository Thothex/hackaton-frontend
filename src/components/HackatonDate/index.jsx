import styles from "./styles.module.scss";

const HackatonDate = ({ props }) => {
  const endDate = new Date(props.end);
  const startDate = new Date(props.start);
  const formattedStartDate = startDate.getDate();
  const startMonth = startDate.toLocaleString("en-US", { month: "long" });
  const formattedEndDate = endDate.getDate();
  const endMonth = endDate.toLocaleString("en-US", { month: "long" });
  return (
    <div className={styles.hackathonPanelHeaderRight}>
      <h4 className={styles.date}>{formattedStartDate}</h4>
      <p className={styles.month}>{startMonth}</p>
      <hr />
      <h4 className={styles.date}>{formattedEndDate}</h4>
      <p className={styles.month}>{endMonth}</p>
    </div>
  );
};

export default HackatonDate;
