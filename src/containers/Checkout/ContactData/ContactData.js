import React from 'react';
import Button from '../../../Comps/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Comps/UI/Spinner/Spinner';
import withRouter from '../../../hoc/withRouter/withRouter';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ContactData extends React.Component {
    state ={
         name:'',
         email: '',
         address: {
             street: '',
             postalCode:""
         },
         loading:false
    }

 orderHandler = (event) => {
     event.preventDefault();
     console.log(this.props.stuff)
     this.props.navigate("/")
      this.setState({ loading: true});
                const order = {
                    ingredients: this.state.ingredients,
                    price: this.props.price,
                    customer: {
                        name: 'Gerald Eze',
                        address: {
                            street: 'kubwa',
                            zipCode: '901101',
                            country: 'Nigeria'
                        },
                        email: 'truetest@test.com'
                    },
                    deliveryMethod: 'fastest'
                };
            const sendPost = async () => {

               axios.post(`/orders.json`, order)
                    .then(res => {
                        this.setState({ loading: false})
                    
                    })
                    .catch(err => {
                        this.setState({ loading: false})
                    });
            };
            sendPost();    
  }


    render() { 
        let form =  <form>
                        <input className="Input" type="text" name="name" placeholder="Name" />
                        <input className="Input" type="email" name="name" placeholder="Email" />
                        <input className="Input" type="text" name="street" placeholder="Street" />
                        <input className="Input" type="text" name="postal" placeholder="Postal" />
                        <Button clicked={this.orderHandler} btnType="Button Success"> Order Now</Button>
                     </form>
        if (this.state.loading){
            form = <Spinner />
        }
        return (
            <div className="ContactData">
                <h4>Enter your Contact Data</h4>
               {form}
            </div>
        )
    }
}
 
export default withRouter(withErrorHandler(ContactData, axios));