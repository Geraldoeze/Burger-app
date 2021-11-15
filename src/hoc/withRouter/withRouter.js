import {  useLocation, useNavigate} from "react-router";


const withRouter = ( Child ) => {
    return ( props ) => {
        const location = useLocation();
        const navigate = useNavigate();
        const match = ''
        return <Child { ...props }
         navigate = {navigate} 
          location={location} 
          param={match}
            />
    }
}

export default withRouter;