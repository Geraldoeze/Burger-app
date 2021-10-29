import BuildControl from "./BuildControl/BuildControl";
import './BuildControls.css'


const controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" }
]; 

const buildControls = () => {
    return ( 
        <div className="BuildControls">
            {controls.map(ctrl => (
                <BuildControl key={ctrl.label} label={ctrl.label} />
            ))}             
        </div>
     );
}
 
export default buildControls;