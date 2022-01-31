import * as actionTypes from '../action/actionTypes'
import { updateObject } from '../../../shared/utility';

const initialState = {
    ingredients : null,
    totalPrice: 4,
    error: false,
    building: false 
};

    
const INGREDIENTS_PRICES = {
    salad: 0.3,
    bacon: 1.2,
    meat: 0.3,
    cheese: 1.2
}

const addIngredient = (state, action) => {
    const updateIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }  
    const updateIngredients = updateObject(state.ingredients, updateIngredient);
    const updatedState = {
        ingredients: updateIngredients,
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState)

};

const removeIngredient = (state, action) => {
    const updateIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }  
    const updateIngs = updateObject(state.ingredients, updateIng);
    const updatedSta = {
        ingredients: updateIngs,
        totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedSta)

}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
    });
}

const fetchIngredientsFailed = (state, action )=> {
    return updateObject(state, {error : true})

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
            
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);

        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action)
            
        default: return state;    
    }
}

export default reducer;