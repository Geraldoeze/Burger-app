import React from 'react';
import { connect } from 'react-redux';
import Button from '../../../Comps/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Comps/UI/Spinner/Spinner';
import withRouter from '../../../hoc/withRouter/withRouter';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Input from '../../../Comps/UI/Input/Input';
import * as actions from '../../../hoc/store/action/index'
import { updateObject, checkVadility } from '../../../shared/utility'

class ContactData extends React.Component {
    state ={
        orderForm:{
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                street: {
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'Street'
                        },
                        value: '', 
                        validation: {
                            required: true
                        },
                        valid: false,
                        touched: false

                    },
                zipCode: {
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'ZIP Code'
                        },
                        value: '',
                        validation: {
                            required: true,
                            minLength: 5,
                            maxLength: 5
                        },
                        valid: false,
                        touched: false

                    },
                    country: {
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'Country'
                        },
                        value: '',
                        validation: {
                            required: true
                        },
                        valid: false,
                        touched: false

                    },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-mail'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false

                },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true 
            }
        },
         formIsvalid: false
    };

 orderHandler = (event) => {
     event.preventDefault();
      const formData = {};
      for (let formElementIdentifier in this.state.orderForm){
          formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
      }
                const order = {
                    ingredients: this.props.ings,
                    price: this.props.price,
                    orderData: formData,
                    userId: this.props.userId
                }  
                this.props.onOrderBurger(order, this.props.token);
  }

checkVadility = (value, rules) => {
    let isValid = true;

    if (!rules){
        return true;
    }

    if(rules.required) {
        //trim remove any leading white spaces
        isValid = value.trim() !== ' ' && isValid; 
        console.log(rules.required)
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    } 
    // if (rules.isEmail) {
    //     const pattern = /[a-z0-9!#$%&]
    // }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }
    return isValid;
}

inputChangedHandler = (event, inputIdentifier) => {
    
    const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier],{
        value: event.target.value,
        valid: checkVadility(event.target.value, this.state.orderForm[inputIdentifier].validation),
        touched: true
    }
        );
        const updatedOrdereForm = updateObject(this.state.orderForm, {
        [inputIdentifier]: updatedFormElement
        })
        
    let formIsvalid = true;
    for (let inputIdentifier in updatedOrdereForm){
        formIsvalid = updatedOrdereForm[inputIdentifier].valid &&  formIsvalid;
    }
    this.setState({orderForm: updatedOrdereForm, formIsvalid: formIsvalid})
    
}
    render() { 
//This enables us to access name, street, zipcode  
const formElementsArray = [];
for (let key in this.state.orderForm){
    formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
    });
} 
     
        let form =  <form onSubmit={this.orderHandler}>
                        {formElementsArray.map(formElement => (
                            <Input 

                                key={formElement.id}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched = {formElement.config.touched}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            />
                        ))}
                        <Button btnType="Button Success" disabled={!this.state.formIsvalid}> Order Now</Button>
                     </form>
        if (this.props.loading){
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

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
}}
 
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(ContactData, axios)));