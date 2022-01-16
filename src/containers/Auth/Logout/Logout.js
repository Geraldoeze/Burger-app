import React, { useEffect } from 'react';
import * as actions from '../../../hoc/store/action/index'
import { Navigate } from 'react-router'

import {connect} from 'react-redux'


const Logout = (props) => {
    const { onLogout } = props;

    useEffect(() => {
        onLogout();
    }, [onLogout]);
    
        return <Navigate to="/" />;
    
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}
 
export default connect(null, mapDispatchToProps)(Logout);