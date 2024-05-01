import styles from "./styles.module.scss";
import PropTypes from "prop-types";

const InfoTooltip = ({text})=>{
    return( <div className={styles.tooltip}>
        <span>!</span>
        <span className={styles.text}>
            {text}
          </span>
    </div>)
}
InfoTooltip.propTypes ={
    text: PropTypes.string
}
export default InfoTooltip
