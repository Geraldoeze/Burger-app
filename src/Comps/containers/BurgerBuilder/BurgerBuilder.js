import React, { Component } from 'react';
import Aux from '../../../hoc/Auxillary';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal'
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';
import axios from '../../../axios-orders';
import Spinner from '../../UI/Spinner/Spinner';



const INGREDIENTS_PRICES = {
    salad: 2.3,
    bacon: 1.2,
    meat: 3.7,
    cheese: 1.8
}


class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 9,
        purchasable: false,
        purchasing: false,
        loading: false
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

    addIngredientHandler = (type)  => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice; 
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients); 

        }
    removeIngredientHandler = (type)  => {
            const oldCount = this.state.ingredients[type];
             if (oldCount <= 0){
               return;
            }
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const priceDeduction = INGREDIENTS_PRICES[type];
            const oldPrice = this.state.totalPrice; 
            const newPrice = oldPrice - priceDeduction;
            this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
            this.updatePurchaseState(updatedIngredients); 

            }

            purchaseHandler = () => {
                this.setState({purchasing: true});
            }
            
            purchaseCancelHandler = () => {
                this.setState({purchasing: false});
            }

            pruchaseContinueHandler = () => {
                //alert('Your Order')
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
                axios.post(`/orders.json`, order)
                    .then(res => {
                        this.setState({ loading: false, purchasing: false })
                    })
                    .catch(err => {
                        this.setState({ loading: false, purchasing: false })
                    });
            }
    render() {  
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary =  <OrderSummary
            price={this.state.totalPrice}
            purchasedCancelled={this.purchaseCancelHandler}
            purchasedContinued={this.pruchaseContinueHandler}
            ingredients={this.state.ingredients}/>

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
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientRemoved={this.removeIngredientHandler}
                    ingredientAdded={this.addIngredientHandler}
                    disabled={disableInfo}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                    purchasable={this.state.purchasable} />
            </Aux>
        )
    }
}
 
export default BurgerBuilder;  