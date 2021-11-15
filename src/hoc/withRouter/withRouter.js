import {  useLocation, useNavigate, useOutlet} from "react-router";


const withRouter = ( Child ) => {
    return ( props ) => {
        const location = useLocation();
        const navigate = useNavigate();
        const match = useOutlet();
        return <Child { ...props }
         navigate = {navigate} 
          location={location} 
          param={match}
            />
    }
}

export default withRouter;