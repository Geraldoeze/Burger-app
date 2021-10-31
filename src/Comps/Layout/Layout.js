import Aux from '../../hoc/Auxillary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import React from 'react'



class Layout extends React.Component {

    state = {
        showSideDrawer: true
    }

    SideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }
    render() { 
        return(<Aux>
            <Toolbar />
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