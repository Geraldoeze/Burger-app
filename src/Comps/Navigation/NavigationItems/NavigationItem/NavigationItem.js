import './NavigationItem.css'
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => {
    return ( 
        <li className="NavigationItem">
            <NavLink to={props.link}>
                {props.children}
            </NavLink>
        </li>
     );
}
 
export default navigationItem;