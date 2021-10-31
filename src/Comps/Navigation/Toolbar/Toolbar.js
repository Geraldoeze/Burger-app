import './Toolbar.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';


const toolbar = () => {
    return (
        <header className="Toolbar">
            <div>MENU</div>
            <Logo height="80%"/>
            <nav className="DesktopOnly">
                <NavigationItems />
            </nav>
        </header>
    );
}
 
export default toolbar;