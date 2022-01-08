import BuildControl from "./BuildControl/BuildControl";
import './BuildControls.css'


const controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" }
]; 

const buildControls = (props) => {
    return ( 
        <div className="BuildControls">
            <p>Current Price: {props.price.toFixed(2)}</p>
            {controls.map(ctrl => (
                <BuildControl key={ctrl.label} 
                label={ctrl.label}
                removed={()=> props.ingredientRemoved(ctrl.type)}
                 added={()=> props.ingredientAdded(ctrl.type)} 
                 disabled={props.disabled[ctrl.type]}/>
            ))}      
            <button className="OrderButton"
                onClick={props.ordered}
            disabled={!props.purchasable}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>       
        </div>
     );
}
 
export default buildControls;