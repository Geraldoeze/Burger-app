import React from 'react'
import withRouter from '../../hoc/withRouter/withRouter'
import CheckoutSummary from '../../Comps/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends React.Component {
    
   
    state = {
        ingredients: "",
        price: 0
    }

    componentDidMount(){
        
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            //['salad','1']
            if(param[0] === 'price') {
                price = param[1];
            }  else {
                ingredients[param[0]] = +param[1];
                }            
        }

        this.setState({ingredients: ingredients, totalPrice: price});

    }
    checkoutCancelledHandler = () => {
        this.props.navigate(-1);
    }

    checkoutContinuedHandler = () => {
        this.props.navigate({
            pathname: "/checkout/contact-data",
            replace: true})
        this.props.callback(this.state.ingredients) 
        this.props.pricecall(this.state.totalPrice)    

    }
    
    

    render(){
       

        
        console.log(this.state.ingredients, this.props.location.pathname)
        return(
            <div>
                 <CheckoutSummary
                  ingredients={this.state.ingredients}
                  checkoutCancelled={this.checkoutCancelledHandler}
                  checkoutContinued={this.checkoutContinuedHandler}/>
            
                                                         
            </div>
        )
    }
}

export default withRouter(Checkout);


