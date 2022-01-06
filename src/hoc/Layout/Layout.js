import React from 'react';
import SideDrawer from '../../Comps/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../Comps/Navigation/Toolbar/Toolbar';
import Aux from '../Auxillary';
import './Layout.css';


class Layout extends React.Component {

    state = {
        showSideDrawer: false
    }

    SideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    SideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }
    render() { 
        return(<Aux>
            <Toolbar drawerToggleClicked={this.SideDrawerToggleHandler}/>
            <SideDrawer
             open={this.state.showSideDrawer}
            closed={this.SideDrawerClosedHandler}/>
            <main className="Content">
                {this.props.children}
            </main>    
        </Aux>
    )}
}
 
export default Layout;  