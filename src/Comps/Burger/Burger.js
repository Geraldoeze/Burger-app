
import React from 'react'
import "./Burger.css";
import BurgerIngredient from './BurgerIngredients/BurgerIngredients'
// import { useHref} from 'react-router-dom';
import { useMatch } from 'react-router';



const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
      .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
          return <BurgerIngredient key={igKey + i} type={igKey} />;
        })
      })
       .reduce((array, curval) => {
         return array.concat(curval)
       }, []);
    if (transformedIngredients.length === 0){
      transformedIngredients = <p>Please start adding Ingredients </p>
    }   
    let same = useMatch()
    console.log(same)
    return (
        <div className="Burger">
          <BurgerIngredient  type="bread-top"/>
          {transformedIngredients}
          <BurgerIngredient type="bread-bottom"/>
        </div>
      );
}
 
export default Burger;
