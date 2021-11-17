import React, { Component } from 'react';

import Aux from "../../../hoc/Auxillary";
import Button from "../../UI/Button/Button";
import '../../UI/Button/Button.css'

class OrderSummary extends Component {
    //This could be a functional component
    
    render(){
    const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return(
                <li key={igKey}>
                    <span style={{textTransform: "capitalize"}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
            )    
        })
    return ( 
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price}</strong> </p>
            <p>Continue to CheckOut</p>
            <Button btnType="Button Danger" clicked={this.props.purchasedCancelled} > CANCEL</Button>
            <Button btnType="Button Success" clicked={this.props.purchasedContinued} >CONTUINUE</Button> 
        </Aux>
     );
    }
}
 
export default OrderSummary;