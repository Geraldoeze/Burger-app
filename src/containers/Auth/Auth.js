import React from "react";
import Input from '../../Comps/UI/Input/Input';
import Button from '../../Comps/UI/Button/Button';
import './Auth.css'


class Auth extends React.Component {

    state ={
        controls: {
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Mail Address'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false
                },
                password: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Password'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 6
                    },
                    valid: false,
                    touched: false
                }
        }
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

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkVadility(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls){
            formElementsArray.push({
            id: key,
            config: this.state.controls[key]
            });
        } 
        
        const form = formElementsArray.map(formElement => {
          return ( <Input  
                key={formElement.id}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched = {formElement.config.touched}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />)
    
        })
        return (
            <div className="Auth">
                <form>
                    {form}
                    <Button btnType="Button Success">SUBMIT</Button>
                </form>
            </div>
        );
    }
}

export default Auth;