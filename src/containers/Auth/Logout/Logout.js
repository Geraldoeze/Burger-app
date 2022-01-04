import React from 'react';
import * as actions from '../../../hoc/store/action/index'
import { Navigate } from 'react-router'

import {connect} from 'react-redux'


class Logout extends React.Component {
    componentDidMount () {
        this.props.onLogout();
    }
    render() { 
        return <Navigate to="/" />;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}
 
export default connect(null, mapDispatchToProps)(Logout);