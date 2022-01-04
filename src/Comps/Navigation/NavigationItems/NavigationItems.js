import NavigationItem from './NavigationItem/NavigationItem'
import './NavigationItems.css'


const navigationItems = (props) => {
    return ( 
        <ul className="NavigationItems">
            <NavigationItem link="/"  >Burger Builder</NavigationItem>
            {props.isAuthenticated ? <NavigationItem link="/orders" >Orders</NavigationItem> : null}
            {!props.isAuthenticated
                ? <NavigationItem link="/auth" >Authentication</NavigationItem>
                : <NavigationItem link="/logout" >Logout</NavigationItem>
            }
        </ul>
     );
}
 
export default navigationItems;