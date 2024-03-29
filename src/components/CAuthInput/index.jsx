import styles from "./styles.module.scss";
import PropTypes from "prop-types";

const AuthInput = ({ onChange, ...props }) => {
  return (
    <label>
      <span className={styles.inputTitle}>{props.label}</span>
      <input
        type={props.type}
        placeholder={props.inner}
        name={props.name}
        value={props.value || ""}
        onChange={(e) => onChange(e)}
      />
    </label>
  );
};

AuthInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  inner: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
export default AuthInput;
