import React from "react";
import Spinner from "../../Comps/UI/Spinner/Spinner";
import { Navigate } from "react-router";

import Input from '../../Comps/UI/Input/Input';
import Button from '../../Comps/UI/Button/Button';
import './Auth.css'
import * as actions from '../../hoc/store/action/index'
import { connect } from 'react-redux'


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
        },
        isSignup: true
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
            this.props.onSetAuthRedirectPath();
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
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    };

    switchAuthModeHandler = (event) => {
        event.preventDefault()
        this.setState(prevState =>{
            return {isSignup: !prevState.isSignup};
        });
    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.controls){
            formElementsArray.push({
            id: key,
            config: this.state.controls[key]
            }); 
        } 
        
        let form = formElementsArray.map(formElement => {
          return ( <Input  
                key={formElement.id}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched = {formElement.config.touched}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />);
        })
        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                // We are using firebase error message
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            console.log(this.props.authRedirectPath)
            authRedirect = <Navigate to={this.props.authRedirectPath}/>
        }

        return (
            <div className="Auth">
                {authRedirect}
                {errorMessage}
                <form>
                    {form}
                    <Button 
                     clicked={this.submitHandler}
                    btnType="Button Success">SUBMIT</Button>
                    <Button
                    clicked={this.switchAuthModeHandler}
                     btnType="Button Danger"
                     >SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
                </form>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);