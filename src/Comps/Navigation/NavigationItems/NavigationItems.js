import NavigationItem from './NavigationItem/NavigationItem'
import './NavigationItems.css'


const navigationItems = () => {
    return ( 
        <ul className="NavigationItems">
            <NavigationItem link="/"  >Burger Builder</NavigationItem>
            <NavigationItem link="/orders" >Orders</NavigationItem>
            <NavigationItem link="/auth" >Authentication</NavigationItem>
        </ul>
     );
}
 
export default navigationItems;