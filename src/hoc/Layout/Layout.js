import React from 'react';
import SideDrawer from '../../Comps/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../Comps/Navigation/Toolbar/Toolbar';
import Aux from '../Auxillary';
import './Layout.css';

import {connect} from 'react-redux'


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
            <Toolbar 
                isAuth={this.props.isAuthenticated}
                drawerToggleClicked={this.SideDrawerToggleHandler}/>
            <SideDrawer
                isAuth={this.props.isAuthenticated}
                open={this.state.showSideDrawer}
                closed={this.SideDrawerClosedHandler}/>
            <main className="Content">
                {this.props.children}
            </main>    
        </Aux>
    )}
}

const mapStateToProps = state =>{
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);  