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
                    value: ''
                },
                street: {
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'Street'
                        },
                        value: ''
                    },
                zipCode: {
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'ZIP Code'
                        },
                        value: ''
                    },
                    country: {
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'Country'
                        },
                        value: ''
                    },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-mail'
                    },
                    value: ''
                },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }, 
        },
         loading:false
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

inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrdereForm = {
        ...this.state.orderForm
    }
    const updatedFormElement = {
        ...updatedOrdereForm[inputIdentifier]
    }; 
    updatedFormElement.value = event.target.value;
    updatedOrdereForm[inputIdentifier] = updatedFormElement;
    this.setState({orderForm: updatedOrdereForm})
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
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            />
                        ))}
                        <Button btnType="Button Success"> Order Now</Button>
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