import React from 'react'
import withRouter from '../../hoc/withRouter/withRouter'
import CheckoutSummary from '../../Comps/Order/CheckoutSummary/CheckoutSummary'

import { connect } from 'react-redux'
import { Navigate } from 'react-router'

class Checkout extends React.Component {

   
    
    checkoutCancelledHandler = () => {
        this.props.navigate(-1);
    }

    checkoutContinuedHandler = () => {
        this.props.navigate({
            pathname: "/checkout/contact-data",
            replace: true})

    }
    refreshHandler = () => {
        this.props.navigate("/")
    }
    

    render(){
       let summary =  <Navigate to="/" />
       if (this.props.ings) {
       const purchasedRedirect = this.props.purchased ? <Navigate to="/" /> : null

            summary = (
              <div>
                {purchasedRedirect}
                <CheckoutSummary
                ingredients={this.props.ings}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}/>
              </div>
            );
       }

        
        return(
        <div>
            {summary}
        </div> ) 
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};


export default connect(mapStateToProps)(withRouter(Checkout));


