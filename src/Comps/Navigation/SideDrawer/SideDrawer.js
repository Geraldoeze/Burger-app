
import './SideDrawer.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxillary';


const sideDrawer = (props) => {
    let attachedClasses = ["sideDrawer Close"];
    if (props.open) {
        attachedClasses = ["SideDrawer Open"];
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                
                    <Logo height="11%"/>
                    
                <nav>
                    < NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Aux>
      );
}
 
export default sideDrawer;