import './Toolbar.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToogle from '../SideDrawer/DrawToogle/DrawToogle';


const toolbar = () => {
    return (
        <header className="Toolbar">
            <DrawerToogle />
            <Logo className="Logo"/>
            <nav className="DesktopOnly">
                <NavigationItems />
            </nav>
        </header>
    );
}
 
export default toolbar;