import React from 'react'
import CheckoutSummary from '../../Order/CheckoutSummary/CheckoutSummary'
import withRouter from '../../../hoc/withRouter/withRouter'
import { Route, Routes } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
 import { Link } from 'react-router-dom'


class Checkout extends React.Component {
    
   
    state = {
        ingredients: {
            salad:1,
            meat:1,
            cheese:1,
            bacon:1
        }
    }

    componentDidMount(){
        
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            //['salad','1']
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients});
    }
    checkoutCancelledHandler = () => {
        this.props.navigate(-1);
    }

    checkoutContinuedHandler = () => {
        this.props.navigate({
            pathname:"/contact-data",
            replace: false})
        this.props.callback(this.state.ingredients)    
    }
    static defaultProps =  this.state
    

    render(){
       

        
        console.log(this.state.ingredients)
        return(
            <div>
                 <CheckoutSummary
                  ingredients={this.state.ingredients}
                  checkoutCancelled={this.checkoutCancelledHandler}
                  checkoutContinued={this.checkoutContinuedHandler}/>
            
                    {/* <Link to = "/contact-data" Component={<ContactData/>}
                    >
                    
                        <ContactData stuff />

                    </Link>
                      
                    
                 */}
                <Routes>
                    <Route path="/contact-data" element={<ContactData/>}
                    />
                </Routes>
                
                             
                    
                
            </div>
        )
    }
}

export default withRouter(Checkout);


