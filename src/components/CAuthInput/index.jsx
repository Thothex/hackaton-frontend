import './styles.module.scss'
const AuthInput =(props) =>{
    return (
        <label> <span>{props.label}</span>
            <input type={props.type} placeholder={props.inner}/>
        </label>
    )
}
export default AuthInput;
