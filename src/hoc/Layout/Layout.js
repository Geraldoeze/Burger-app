import React, {useState} from 'react';
import SideDrawer from '../../Comps/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../Comps/Navigation/Toolbar/Toolbar';
import Aux from '../Auxillary';
import './Layout.css';

import {connect} from 'react-redux'


const Layout = (props) => {

    const [ sideDrawershow, setSideDrawershow] = useState(false);

    const SideDrawerClosedHandler = () => {
        setSideDrawershow(false);
    }

    const SideDrawerToggleHandler = () => {
        setSideDrawershow(!sideDrawershow)
    }
    
        return(<Aux>
            <Toolbar 
                isAuth={props.isAuthenticated}
                drawerToggleClicked={SideDrawerToggleHandler}/>
            <SideDrawer
                isAuth={props.isAuthenticated}
                open={sideDrawershow}
                closed={SideDrawerClosedHandler}/>
            <main className="Content">
                {props.children}
            </main>    
        </Aux>
    )
}

const mapStateToProps = state =>{
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);  