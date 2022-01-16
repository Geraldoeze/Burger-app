import React, { useEffect, useState } from 'react';
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

const BurgerBuilder = (props) => {
    const [purchasing, setPurchasing ] = useState(false);

    const { onInitIngredients } = props;

    useEffect(()=> {
        onInitIngredients();
    }, [onInitIngredients])

    const updatePurchaseState = (ingredients) => {
  
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
            return sum > 0
        }
     
    
    const purchaseHandler = () => {
        if (props.isAuthenticated){
            setPurchasing(true);
        }
        else {
            props.onSetAuthRedirectPath('/checkout')
            props.navigate({
                pathname:'/auth'
            })
        }
    }
            
    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
                props.navigate({
                    pathname:'/checkout'
                }) 
    }
    
        const disableInfo = {
            ...props.ings
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null;

        let burger = props.error ? <p>Ingredients can't be loaded... </p> : <Spinner />
        
        if(props.ings) { 
            burger = ( 
                <Aux>
                <Burger ingredients={props.ings} />
                <BuildControls
                    ingredientRemoved={props.onIngredientRemove}
                    ingredientAdded={props.onIngredientAdded}
                    disabled={disableInfo}
                    price={props.price}
                    isAuth={props.isAuthenticated}
                    ordered={purchaseHandler}
                    purchasable={updatePurchaseState(props.ings)} />
                </Aux>    
            );
            orderSummary =  <OrderSummary
                price={props.price}
                purchasedCancelled={purchaseCancelHandler}
                purchasedContinued={purchaseContinueHandler}
                ingredients={props.ings}/> 
        }
       

        return (
            <Aux>
                <Modal 
                    modalClosed={purchaseCancelHandler}
                    show={purchasing}> 
                   {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemove: (ingName) => dispatch( actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(BurgerBuilder, axios)));  