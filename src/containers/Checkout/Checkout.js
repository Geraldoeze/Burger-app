import React from 'react'
import withRouter from '../../hoc/withRouter/withRouter'
import CheckoutSummary from '../../Comps/Order/CheckoutSummary/CheckoutSummary'

import { connect } from 'react-redux'
import { Navigate } from 'react-router'

const Checkout = (props) => {
    
    const checkoutCancelledHandler = () => {
        props.navigate(-1);
    }

    const checkoutContinuedHandler = () => {
        props.navigate({
            pathname: "/checkout/contact-data",
            replace: true})

    }
    const refreshHandler = () => {
        props.navigate("/")
    }
    

       let summary =  <Navigate to="/" />
       if (props.ings) {
       const purchasedRedirect = props.purchased ? <Navigate to="/" /> : null

            summary = (
              <div>
                {purchasedRedirect}
                <CheckoutSummary
                ingredients={props.ings}
                checkoutCancelled={checkoutCancelledHandler}
                checkoutContinued={checkoutContinuedHandler}/>
              </div>
            );
       }

        
        return(
        <div>
            {summary}
        </div> ) 
    
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};


export default connect(mapStateToProps)(withRouter(Checkout));


