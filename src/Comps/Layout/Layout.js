import Aux from '../../hoc/Auxillary';
import './Layout.css';

const layout = ( props ) => (
    <Aux>
        <div>Toolbar, SideDrawer, Bachdrop</div>
        <main className="Content">
            {props.children}
        </main>    
    </Aux>
)

export default layout;