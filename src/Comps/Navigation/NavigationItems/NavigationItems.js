import NavigationItem from './NavigationItem/NavigationItem'
import './NavigationItems.css'

const navigationItems = () => {
    return ( 
        <ul className="NavigationItems">
            <NavigationItem link="/" active >Burger Builder</NavigationItem>
            <NavigationItem link="/checkout" >CheckOut</NavigationItem>
        </ul>
     );
}
 
export default navigationItems;