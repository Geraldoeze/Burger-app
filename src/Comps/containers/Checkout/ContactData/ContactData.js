import React from 'react'
import Button from '../../../UI/Button/Button'
import './ContactData.css'
import axios from '../../../../axios-orders'


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
      this.setState({ loading: true});
                const order = {
                    ingredients: this.state.ingredients,
                    price: this.state.totalPrice,
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
                }
                axios.post(`/orders`, order)
                    .then(res => {
                        this.setState({ loading: false, purchasing: false })
                    })
                    .catch(err => {
                        this.setState({ loading: false, purchasing: false })
                    });
 }

    render() { 
        console.log(this.props.totalPrice)
        return (
            <div className="ContactData">
                <h4>Enter your Contact Data</h4>
                <form>
                    <input className="Input" type="text" name="name" placeholder="Name" />
                    <input className="Input" type="email" name="name" placeholder="Email" />
                    <input className="Input" type="text" name="street" placeholder="Street" />
                    <input className="Input" type="text" name="postal" placeholder="Postal" />
                    <Button clicked={this.orderHandler} btnType="Button Success"> Order Now</Button>
                </form>
            </div>
        )
    }
}
 
export default ContactData;