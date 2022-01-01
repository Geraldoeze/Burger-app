import React from 'react'
import withRouter from '../../hoc/withRouter/withRouter'
import CheckoutSummary from '../../Comps/Order/CheckoutSummary/CheckoutSummary'
// import {Link } from 'react-router-dom';
import { connect } from 'react-redux'
import {  Navigate } from 'react-router-dom'

class Checkout extends React.Component {

   
    
    checkoutCancelledHandler = () => {
        this.props.navigate(-1);
    }

    checkoutContinuedHandler = () => {
        this.props.navigate({
            pathname: "/checkout/contact-data",
            replace: true})

    }
    
    

    render(){
       let summary = <Navigate to ="/"/>

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

        
        console.log(this.props.ings, this.props.location.pathname)
        return(
            <div>
                {summary}
                      {/* <Link to="/checkout/contact-data">ContactData</Link> */}
                                                         
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};


export default connect(mapStateToProps)(withRouter(Checkout));


