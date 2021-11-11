
import './DrawToggle.css'

const DrawerToogle = (props) => {
    return ( 
        <div onClick={props.clicked} className="DrawerToggle">
            <div></div>           
            <div></div>
            <div></div>

        </div>
     );
}
 
export default DrawerToogle;