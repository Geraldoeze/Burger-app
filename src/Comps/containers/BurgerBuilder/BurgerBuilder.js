import React, { Component } from 'react';
import Aux from '../../../hoc/Auxillary';
import Burger from '../../Burger/Burger';

class BurgerBuilder extends React.Component {
    render() { 
        return (
            <Aux>
                <Burger />
                <div>Build Controls</div>
            </Aux>
        )
    }
}
 
export default BurgerBuilder;