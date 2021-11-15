import React from 'react'
import Button from '../../../UI/Button/Button'
import './ContactData.css'


class ContactData extends React.Component {
    state ={
         name:'',
         email: '',
         address: {
             street: '',
             postalCode:""
         }
    }

 orderHandler = (event) => {
     event.preventDefault();
     
 }

    render() { 
        console.log(this.props.stuff)
        return (
            <div className="ContactData">
                <h4>Enter your Contact Data</h4>
                <form>
                    <input className="Input" type="text" name="name" placeholder="Name" />
                    <input className="Input" type="email" name="name" placeholder="Email" />
                    <input className="Input" type="text" name="street" placeholder="Street" />
                    <input className="Input" type="text" name="postal" placeholder="Postal" />
                    <Button btnType="Button Success" clicked={this.orderHandler}> Order Now</Button>
                </form>
            </div>
        )
    }
}
 
export default ContactData;