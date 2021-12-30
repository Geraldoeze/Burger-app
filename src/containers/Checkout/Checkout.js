import React from 'react'
import withRouter from '../../hoc/withRouter/withRouter'
import CheckoutSummary from '../../Comps/Order/CheckoutSummary/CheckoutSummary'
// import {Link } from 'react-router-dom';
import { connect } from 'react-redux'

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
       

        
        console.log(this.props.ings, this.props.location.pathname)
        return(
            <div>
                 <CheckoutSummary
                  ingredients={this.props.ings}
                  checkoutCancelled={this.checkoutCancelledHandler}
                  checkoutContinued={this.checkoutContinuedHandler}/>
                {/* <Link to="/checkout/contact-data">ContactData</Link> */}
                                                         
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}
export default connect(mapStateToProps)(withRouter(Checkout));


