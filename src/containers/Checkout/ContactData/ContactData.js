import React from 'react';
import Button from '../../../Comps/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Comps/UI/Spinner/Spinner';
import withRouter from '../../../hoc/withRouter/withRouter';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Input from '../../../Comps/UI/Input/Input';

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
                value: '',
                validation: {},
                valid: true 
            }
        },
         loading:false,
         formIsvalid: false
    };

 orderHandler = (event) => {
     event.preventDefault();
      this.setState({ loading: true});
      const formData = {};
      for (let formElementIdentifier in this.state.orderForm){
          formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
      }
                const order = {
                    ingredients: this.state.ingredients,
                    price: this.props.price,
                    orderData: formData
                }  
            const sendPost = async () => {

               axios.post(`/orders.json`, order)
                    .then(res => {
                           this.setState({ loading: false})
                           this.props.navigate("/")

                    })
                    .catch(err => {
                        this.setState({ loading: false})
                    });
            };
            sendPost();    
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
    return isValid;
}

inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrdereForm = {
        ...this.state.orderForm
    }
    const updatedFormElement = {
        ...updatedOrdereForm[inputIdentifier]
    }; 
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkVadility(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true;
    updatedOrdereForm[inputIdentifier] = updatedFormElement;
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