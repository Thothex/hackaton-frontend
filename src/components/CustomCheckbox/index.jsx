import styles from './styles.module.scss'
import PropTypes from 'prop-types';

const CCheckbox = ({ label, checked = false, onChange }) => {
  console.log('CCheckbox', label, checked, onChange)

  const handleCheckboxChange = (event) => {
    onChange(event.target.checked)
    console.log('handleCheckboxChange', event.target.checked)
  }
  return (
    <label className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e)=>handleCheckboxChange(e)}
        className={styles.hiddenNativeCheckbox}
      />
      <div className={styles.boxWrapper}>
        <div
          className={`${styles.checkmark} ${checked ? `${styles.checked} ${styles.fillChecked}` : ''}`}></div>
        <svg
          className={checked ? styles.checkboxArraw : styles.unckecked}
          width="12"
          height="9"
          viewBox="0 0 12 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.6668 1.5L4.25016 7.91667L1.3335 5"
            stroke="#97abdf"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className={styles.label}>{label}</span>
    </label>
  )
}

CCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default CCheckbox
