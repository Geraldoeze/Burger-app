import React  from 'react';
import Aux from "../../../hoc/Auxillary";
import Button from "../../UI/Button/Button";
import '../../UI/Button/Button.css'


const OrderSummary = (props) => {
    
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return(
                <li key={igKey}>
                    <span style={{textTransform: "capitalize"}}>{igKey}</span>: {props.ingredients[igKey]}
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
            <p><strong>Total Price: {props.price}</strong> </p>
            <p>Continue to CheckOut</p>
            <Button btnType="Button Danger" clicked={props.purchasedCancelled} > CANCEL</Button>
            <Button btnType="Button Success" clicked={props.purchasedContinued} >CONTUINUE</Button> 
        </Aux>
     );
    
}
 
export default OrderSummary;