import React from 'react'
import './Order.css'


const order = (props) => {
    //To turn our Object ingredients into an array of ingredients
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientsOutput = ingredients.map(ign => {
        return <span style={{textTransform: 'capitalize',
                             display:'inline-block',
                             margin:'0 8px',
                             border:'1px solid #ccc',
                             padding:'5px'   }}>
                    {ign.name} ({ign.amount})
                </span>
    })
     
    return ( 
        <div className="Order">
            <p> Ingredients: {ingredientsOutput}</p>
            {/* Number.parseFloat will convert a string to a number */}
            <p> Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
     );
}
 
export default order; 