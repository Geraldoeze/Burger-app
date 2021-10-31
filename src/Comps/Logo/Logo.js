import burgerLogo from '../../assets/images/burger-logo.png'
import './Logo.css';


const logo = (props) => {
    return (
        <div className="Logo" style={{height: props.height}}>
            <img src={burgerLogo} alt="Burger"/>
        </div>
      );
}
 
export default logo;