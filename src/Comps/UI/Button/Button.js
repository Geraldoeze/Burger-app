 import './Button.css'

const button = (props) => {
    return (
        <button 
        className= {props.btnType}
           onClick={props.clicked}
        >{props.children}</button>
      );
}
 
export default button;
    