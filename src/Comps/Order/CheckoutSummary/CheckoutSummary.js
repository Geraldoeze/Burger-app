import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css'

const checkoutSummary = (props) => {
    return ( 
        <div className="CheckoutSummary">
            <h1>Hope it taste well!</h1>
            <div style={{width: "80%", margin: "auto"}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button
             btnType="Button Danger"
             clicked
             >CANCEL</Button>
            <Button
             btnType="Button Sucess"
             clicked
             >CONTINUE</Button>

        </div>
     );
}
 
export default checkoutSummary;