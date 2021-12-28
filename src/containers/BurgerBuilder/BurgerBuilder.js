import React, {Component } from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../Comps/Burger/Burger';
import BuildControls from '../../Comps/Burger/BuildControls/BuildControls';
import Modal from '../../Comps/UI/Modal/Modal'
import OrderSummary from '../../Comps/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'
import Spinner from '../../Comps/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import withRouter from '../../hoc/withRouter/withRouter';
import { connect } from 'react-redux';
import * as actionTypes from '../../hoc/store/actions';


class BurgerBuilder extends Component {
    state = {
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){

        // axios.get(`https://burger-app-8ed4f-default-rtdb.firebaseio.com/ingredients.json`)
        //     .then(response => {
                
        //         this.setState({ingredients: response.data })
        //     })
        //     .catch( error => {
        //         this.setState({error: true})
        //     })
    }

    updatePurchaseState (ingredients) {
  
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
            this.setState({purchasable: sum > 0 })
    }

    
    purchaseHandler = () => {
                this.setState({purchasing: true});
    }
            
    purchaseCancelHandler = () => {
                this.setState({purchasing: false});
    }

    pruchaseContinueHandler = () => {
                alert('Your Order')
                
                const queryParams = [];
                for (let i in this.state.ingredients){
                    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
                }
                queryParams.push('price=' + this.props.price)
                const queryString = queryParams.join('&')
                this.props.navigate({
                    pathname:'/checkout',
                    search: "?" + queryString
                }) 
    }
    render() {  
        const disableInfo = {
            ...this.props.ings
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded </p> : <Spinner />
        
        if(this.props.ings) { 
            burger = ( 
                <Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    ingredientRemoved={this.props.onIngredientRemove}
                    ingredientAdded={this.props.onIngredientAdded}
                    disabled={disableInfo}
                    price={this.props.price}
                    ordered={this.purchaseHandler}
                    purchasable={this.state.purchasable} />
                </Aux>    
            );
            orderSummary =  <OrderSummary
                price={this.state.totalPrice.toFixed(2)}
                purchasedCancelled={this.purchaseCancelHandler}
                purchasedContinued={this.pruchaseContinueHandler}
                ingredients={this.props.ings}/> 
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal 
                    modalClosed={this.purchaseCancelHandler}
                    show={this.state.purchasing}> 
                   {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return{
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemove: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(BurgerBuilder, axios)));  