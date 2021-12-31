import React, {Component } from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../Comps/Burger/Burger';
import BuildControls from '../../Comps/Burger/BuildControls/BuildControls';
import Modal from '../../Comps/UI/Modal/Modal'
import OrderSummary from '../../Comps/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Comps/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import withRouter from '../../hoc/withRouter/withRouter';
import { connect } from 'react-redux';
import * as actions from '../../hoc/store/action/index';
import axios from '../../axios-orders';


class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        this.props.onInitIngredients()
    }

    updatePurchaseState (ingredients) {
  
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
            return sum > 0
        }
     
    
    purchaseHandler = () => {
                this.setState({purchasing: true});
    }
            
    purchaseCancelHandler = () => {
                this.setState({purchasing: false});
    }

    pruchaseContinueHandler = () => {
        this.props.onInitPurchase();
                this.props.navigate({
                    pathname:'/checkout'
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

        let burger = this.props.error ? <p>Ingredients can't be loaded </p> : <Spinner />
        
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
                    purchasable={this.updatePurchaseState(this.props.ings)} />
                </Aux>    
            );
            orderSummary =  <OrderSummary
                price={this.props.price.toFixed(2)}
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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemove: (ingName) => dispatch( actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(BurgerBuilder, axios)));  