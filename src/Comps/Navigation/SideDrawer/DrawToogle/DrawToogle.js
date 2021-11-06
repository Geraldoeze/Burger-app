
import './DrawToggle.css'

const drawerToogle = (props) => {
    return ( 
        <div onClick={props.clicked} className="DrawerToggle">
            <div></div>           
            <div></div>
            <div></div>

        </div>
     );
}
 
export default drawerToogle;