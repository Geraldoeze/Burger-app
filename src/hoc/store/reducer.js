import * as actionTypes from './actions'

const initialState = {
    ingredients: {
        salad: 1,
        bacon: 1,
        meat: 1,
        cheese: 1
    },
    totalPrice: 4
};

    
const INGREDIENTS_PRICES = {
    salad: 0.3,
    bacon: 1.2,
    meat: 0.3,
    cheese: 1.2
}


const reducer = (state = initialState, action) => {
    switch (actionTypes) {
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName] 
            }    
        default:
            return state;    
    }
}

export default reducer;