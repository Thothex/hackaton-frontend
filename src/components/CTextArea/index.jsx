import styles from './styles.module.scss'
import PropTypes from 'prop-types'

const CTextArea = ({ onChange, ...props}) =>{
    return (
        <label>
            <span className={styles.inputTitle}>{props.label}</span>
            <textarea className={styles.textarea} type={props.type} placeholder={props.inner} name={props.name} value={props.value} onChange={(e)=>onChange(e)}/>
        </label>
    )
}

CTextArea.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    inner: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
}
export default CTextArea;
