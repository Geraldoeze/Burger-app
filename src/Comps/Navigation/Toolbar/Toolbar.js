import './Toolbar.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToogle from '../SideDrawer/DrawToogle/DrawToogle';


const toolbar = (props) => {
    return (
        <header className="Toolbar">
            <DrawerToogle clicked={props.drawerToggleClicked} />
            
                <Logo height="80%" />
            
            <nav className="DesktopOnly">
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
        </header>
    );
}
 
export default toolbar;